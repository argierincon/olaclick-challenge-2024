import { fetchOrders } from "../services/apiService";
import type { IOrdersData } from "./interfaces/IOrders";
import type { IState } from "./state";

export const actions = {
  async getOrders(this: IState) {
    let orders: IOrdersData;
    try {
      const params = { limit: this.tableLimit, page: this.tablePage };

      orders = await fetchOrders(params);
    } catch (error) {
      throw new Error("Failed to fetch orders");
    }
    this.ordersData = orders;
  },

  setLimit(this: IState, limit: number) {
    this.tableLimit = limit;
    this.tablePage = 1;
  },

  setPage(this: IState, page: number) {
    this.tablePage = page;
  },
};
