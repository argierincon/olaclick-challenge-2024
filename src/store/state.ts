import type { QueryDocumentSnapshot } from "firebase/firestore";
import type { IOrder } from "./interfaces/IOrders";

export interface INewOrder {
  client: string;
  id: number;
}

export interface ILastOrderUpdated extends INewOrder {
  status: string;
}

export interface IState {
  ordersData: IOrder[] | [];
  ordersDocs: QueryDocumentSnapshot[] | [];
  orderDetail: IOrder | null;
  lastFinishedOrders: IOrder[] | null;
  lastOrderUpdated: ILastOrderUpdated | null;
  newOrder: INewOrder | null;
  totalOrders: number;
}

export const state = (): IState => ({
  ordersData: [],
  ordersDocs: [],
  orderDetail: null,
  lastFinishedOrders: null,
  lastOrderUpdated: null,
  newOrder: null,
  totalOrders: 0,
});
