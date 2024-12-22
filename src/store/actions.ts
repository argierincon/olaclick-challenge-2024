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
} from "firebase/firestore";
import { db } from "../services/firebase";

import type { IOrder } from "./interfaces/IOrders";
import type { IState } from "./state";
import { generateRandomOrders } from "../services/menu";

export const actions = {
  async addOrderToCollection() {
    try {
      let count = 0;

      // Se llama hasta 5 veces en intervalos aleatorios entre 30 segundos y un minuto
      const generateNextOrder = async () => {
        if (count < 5) {
          const orders = generateRandomOrders();
          // console.log(`Orden ${count + 1}:`, orders);
          count++;

          // crear ordenes en firebase
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

      // Iniciar la llamada inicial
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

        this.ordersData = { data: orders, total: orders.length };
      });
    } catch (error) {
      throw new Error("Failed to fetch orders");
    }
  },
  async getOrderDetail(this: IState, orderId: string) {
    try {
      const orderDocRef = doc(db, "orders", orderId);

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

  setLimit(this: IState, limit: number) {
    this.tableLimit = limit;
    this.tablePage = 1;
  },

  setPage(this: IState, page: number) {
    this.tablePage = page;
  },
};
