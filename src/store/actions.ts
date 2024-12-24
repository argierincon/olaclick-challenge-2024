import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  startAfter,
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
import { generateOrder, generateRandomOrders } from "../services/orderSimulator";
import type { TStatus } from "../interfaces/Orders";

let updateLoopTimeout: any = null;

export const actions = {
  async addSingleOrderToCollection() {
    try {
      const order = generateOrder();

      const ordersCollection = collection(db, "orders");

      const docRef = await addDoc(ordersCollection, order);

      console.log(`Orden creada con ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      throw new Error("Failed to create a single order in Firestore");
    }
  },
  async addOrdersToCollection() {
    try {
      let count = 0;

      // Se llama hasta 5 veces en intervalos aleatorios entre 30 segundos y un minuto
      const generateNextOrder = async () => {
        if (count < 5) {
          const orders = await generateRandomOrders();
          // console.log(`Orden ${count + 1}:`, orders);
          count++;

          const ordersCollection = collection(db, "orders");
          const docRefs = orders.map((order) =>
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
  async getOrders(this: IState) {
    try {
      const ordersCollection = collection(db, "orders");

      const q = query(
        ordersCollection,
        where("status", "in", ["started", "delivered"]),
        orderBy("status"),
        orderBy("id"),
        limit(this.tableLimit),
        startAfter(
          this.tablePage > 1 ? (this.tablePage - 1) * this.tableLimit : 0
        )
      );

      // onSnapshot para escuchar los cambios en tiempo real
      onSnapshot(q, (querySnapshot) => {
        const orders: IOrder[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as IOrder),
          uid: doc.id,
        }));

        this.ordersData = orders;

        getCountFromServer(q).then((snapshot) => {
          this.tableTotal = snapshot.data().count;
        });
      });
    } catch (error) {
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

      console.log(`Order ${uid} status updated to ${newStatus}`);
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

          this.lastOrderUpdated = {
            client: order.client,
            id: order.id,
            status: newStatus,
          };

          console.log("ORDEN ENVIADA", this.lastOrderUpdated);
        } else if (order.status === "delivered") {
          newStatus = "finished";

          this.lastOrderUpdated = {
            client: order.client,
            id: order.id,
            status: newStatus,
          };
          console.log("ORDEN ENTREGADA", this.lastOrderUpdated);
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
    const interval = 3000;

    const updateLoop = async () => {
      const hasUpdated = await actions.updateOldestOrderStatus();

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
  stopUpdatingOldOrders() {
    if (updateLoopTimeout) {
      clearTimeout(updateLoopTimeout);
      updateLoopTimeout = null;
      console.log("Proceso de actualización detenido manualmente.");
    } else {
      console.log("No hay un proceso de actualización en ejecución.");
    }
  },
  setLimit(this: IState, limit: number) {
    this.tableLimit = limit;
    this.tablePage = 1;
  },
  setPage(this: IState, page: number) {
    this.tablePage = page;
  },
};
