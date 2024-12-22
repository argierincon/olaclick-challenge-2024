import { order } from "../services/apiService";
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  limit,
  startAfter,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";

import type { IOrder } from "./interfaces/IOrders";
import type { IState } from "./state";

export const actions = {
  async addOrderToCollection(this: IState) {
    try {
      console.log(order);

      const ordersCollection = collection(db, "orders");
      const docRef = await addDoc(ordersCollection, order);
      console.log("Order added to Firestore with ID:", docRef.id);
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

      const querySnapshot = await getDocs(q);

      const orders: IOrder[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as IOrder),
        uid: doc.id,
      }));

      this.ordersData = { data: orders, total: orders.length };
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
