import type { IOrder } from "./interfaces/IOrders";

export interface INewOrder {
  client: string;
  id: number;
}

export interface ILastOrderUpdated extends INewOrder {
  status: string;
}

export interface IState {
  ordersData: IOrder[] | null;
  orderDetail: IOrder | null;
  lastFinishedOrders: IOrder[] | null;
  lastOrderUpdated: ILastOrderUpdated | null;
  newOrder: INewOrder | null;
  tableTotal: number;
  tableLimit: number;
  tablePage: number;
}

export const state = (): IState => ({
  ordersData: [],
  orderDetail: null,
  lastFinishedOrders: null,
  lastOrderUpdated: null,
  newOrder: null,
  tableTotal: 0,
  tableLimit: 10,
  tablePage: 1,
});
