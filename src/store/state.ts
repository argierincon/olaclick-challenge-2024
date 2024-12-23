import type { IOrder } from "./interfaces/IOrders";

export interface IState {
  ordersData: IOrder[] | null;
  orderDetail: IOrder | null;
  tableTotal: number;
  tableLimit: number;
  tablePage: number;
}

export const state = (): IState => ({
  ordersData: [],
  orderDetail: null,
  tableTotal: 0,
  tableLimit: 10,
  tablePage: 1,
});
