import type { IOrder } from "./interfaces/IOrders";

export interface ILastOrderUpdated {
  client: string;
  id: number;
  status: string;
}

export interface IState {
  ordersData: IOrder[] | null;
  orderDetail: IOrder | null;
  lastFinishedOrders: IOrder[] | null;
  lastOrderUpdated: ILastOrderUpdated | null;
  tableTotal: number;
  tableLimit: number;
  tablePage: number;
}

export const state = (): IState => ({
  ordersData: [],
  orderDetail: null,
  lastFinishedOrders: null,
  lastOrderUpdated: null,
  tableTotal: 0,
  tableLimit: 10,
  tablePage: 1,
});
