import type { IState } from "./state";

export const getters = {
  ordersList(state: IState) {
    return state?.ordersData?.data;
  },
  tableTotal(state: IState) {
    return state?.ordersData?.total;
  },
};
