import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
  onSnapshot,
  getCountFromServer,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../services/firebase";

import type { IOrder } from "./interfaces/IOrders";
import type { IState } from "./state";
import {
  generateOrder,
  generateRandomOrders,
} from "../services/orderSimulator";
import type { TStatus } from "../interfaces/Orders";
import { useGlobalStore } from ".";

let updateLoopTimeout: any = null;

export const actions = {
  async addSingleOrderToCollection(this: IState) {
    try {
      const ordersCollection = collection(db, "orders");

      const q = query(ordersCollection, orderBy("id", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      let orderId = 1;

      if (!querySnapshot.empty) {
        const lastOrder = querySnapshot.docs[0].data();
        orderId = lastOrder.id + 1;
      }

      const newOrder = generateOrder(null);
      newOrder.id = orderId;

      const docRef = await addDoc(ordersCollection, newOrder);

      this.newOrder = {
        client: newOrder.client,
        id: newOrder.id,
      };

      // console.log(`Orden creada con ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error("Error al crear la orden:", error);
      throw new Error("Failed to create a single order in Firestore");
    }
  },
  async addOrdersToCollection() {
    try {
      let count = 0;

      // Consulta el último id en la colección de órdenes
      const getLastOrderId = async () => {
        const ordersCollection = collection(db, "orders");
        const q = query(ordersCollection, orderBy("id", "desc"), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          return 0;
        } else {
          const lastOrder = querySnapshot.docs[0].data();
          return lastOrder.id;
        }
      };

      const generateNextOrder = async () => {
        if (count < 5) {
          const lastOrderId = await getLastOrderId(); // Obtener el último id
          const orders = await generateRandomOrders();

          // id secuencial a cada orden
          const updatedOrders = orders.map((order, index) => {
            order.id = lastOrderId + index + 1;
            return order;
          });

          count++;

          const ordersCollection = collection(db, "orders");
          const docRefs = updatedOrders.map((order) =>
            addDoc(ordersCollection, order)
          );

          await Promise.all(docRefs);

          // Generar un intervalo aleatorio entre 30 y 60 segundos (30000 a 60000 ms)
          const interval =
            Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000;

          // Llamar a generateNextOrder después del intervalo aleatorio
          setTimeout(generateNextOrder, interval);
        } else {
          console.log("Generación de órdenes completa.");
        }
      };

      await generateNextOrder();
    } catch (error) {
      console.log(error);
      throw new Error("Failed to add order to Firestore");
    }
  },
  async getOrders(this: IState, limitPerPage: number, currentPage: number) {
    try {
      const ordersCollection = collection(db, "orders");

      // Obtener el total de órdenes
      const qTotalOrders = query(
        ordersCollection,
        where("status", "in", ["started", "delivered"]),
        orderBy("status"),
        orderBy("id")
      );

      getCountFromServer(qTotalOrders).then((snapshot) => {
        this.totalOrders = snapshot.data().count;
      });

      // Construir la consulta para la página actual basada en índices
      const offset = (currentPage - 1) * limitPerPage; // Calcular el desplazamiento
      const qCurrentRange = query(
        ordersCollection,
        where("status", "in", ["started", "delivered"]),
        orderBy("status"),
        orderBy("id"),
        limit(limitPerPage + offset)
      );

      // Ejecutar la consulta con onSnapshot
      onSnapshot(qCurrentRange, (querySnapshot) => {
        const allDocs = querySnapshot.docs;

        // Filtrar solo los documentos de la página actual
        const pageDocs = allDocs.slice(offset, offset + limitPerPage);

        // Almacenar el último documento de esta página
        if (!this.ordersDocs) this.ordersDocs = [];
        this.ordersDocs[currentPage - 1] = pageDocs[pageDocs.length - 1];

        // Procesar y guardar las órdenes
        const orders: IOrder[] = pageDocs.map((doc) => ({
          ...(doc.data() as IOrder),
          uid: doc.id,
        }));

        this.ordersData = orders;
      });
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      throw new Error("Failed to fetch orders");
    }
  },
  async getOrderDetail(this: IState, uid: string) {
    try {
      const orderDocRef = doc(db, "orders", uid);

      const orderDoc = await getDoc(orderDocRef);

      if (orderDoc.exists()) {
        const orderDetail: IOrder = {
          ...(orderDoc.data() as IOrder),
          uid: orderDoc.id,
        };

        this.orderDetail = orderDetail;
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      throw new Error("Failed to fetch order detail");
    }
  },
  async updateOrderStatus(this: IState, uid: string, newStatus: TStatus) {
    try {
      const orderDocRef = doc(db, "orders", uid);

      await updateDoc(orderDocRef, {
        status: newStatus,
      });

      // console.log(`Order ${uid} status updated to ${newStatus}`);
    } catch (error) {
      console.log("Error updating order status:", error);
      throw new Error("Failed to update order status");
    }
  },
  async updateOldestOrderStatus(this: IState) {
    try {
      const ordersCollection = collection(db, "orders");

      // Consulta la orden más antigua que no tenga el estado 'finished'
      const q = query(
        ordersCollection,
        where("status", "in", ["started", "delivered"]),
        orderBy("time"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const order = doc.data();

        let newStatus: TStatus;

        // Cambiar el estado de la orden
        if (order.status === "started") {
          newStatus = "delivered";
        } else if (order.status === "delivered") {
          newStatus = "finished";
        } else {
          return false;
        }

        // Actualizar el estado de la orden
        const orderDocRef = doc.ref;
        await updateDoc(orderDocRef, { status: newStatus });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(
        "Error al actualizar el estado de la orden más antigua:",
        error
      );
      throw new Error("Failed to update the status of the oldest order");
    }
  },
  async startUpdatingOldOrders() {
    const interval = 3500;
    const store = useGlobalStore();

    const updateLoop = async () => {
      const hasUpdated = await store.updateOldestOrderStatus();

      if (hasUpdated) {
        updateLoopTimeout = setTimeout(updateLoop, interval);
      } else {
        console.log("No quedan órdenes pendientes. Proceso detenido.");
        updateLoopTimeout = null; // Limpia el timeout activo
      }
    };

    updateLoop();
  },
  async getRecentFinishedOrders(this: IState) {
    try {
      const ordersCollection = collection(db, "orders");

      const q = query(
        ordersCollection,
        where("status", "==", "finished"),
        orderBy("time", "desc"),
        limit(6)
      );

      onSnapshot(q, (querySnapshot) => {
        const recentFinishedOrders = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as IOrder),
          uid: doc.id,
        }));

        this.lastFinishedOrders = recentFinishedOrders;
      });
    } catch (error) {
      throw new Error("Failed to fetch recent finished orders");
    }
  },
  listenToOrderUpdates(this: IState) {
    const ordersCollection = collection(db, "orders");

    const q = query(
      ordersCollection,
      where("status", "in", ["started", "delivered"]),
      orderBy("time"),
      limit(1)
    );

    onSnapshot(q, (querySnapshot) => {
      let newStatus: string;
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const order = doc.data();

        if (
          order.status === "started" &&
          this.lastOrderUpdated?.status === "delivered"
        ) {
          newStatus = "finished";
          this.lastOrderUpdated = {
            client: this.lastOrderUpdated?.client || "",
            id: this.lastOrderUpdated?.id || 0,
            status: newStatus,
          };
        } else if (order.status === "delivered") {
          newStatus = "delivered";
          this.lastOrderUpdated = {
            client: order.client,
            id: order.id,
            status: newStatus,
          };
        }
      } else if (this.lastOrderUpdated?.status === "delivered") {
        newStatus = "finished";
        this.lastOrderUpdated = {
          client: this.lastOrderUpdated?.client || "",
          id: this.lastOrderUpdated?.id || 0,
          status: newStatus,
        };
      }
    });
  },
  stopUpdatingOldOrders() {
    if (updateLoopTimeout) {
      clearTimeout(updateLoopTimeout);
      updateLoopTimeout = null;
      console.log("Proceso de actualización detenido manualmente.");
    } else {
      console.log("No hay un proceso de actualización en ejecución.");
    }
  },
};
