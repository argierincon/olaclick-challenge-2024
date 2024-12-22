import type { TStatus } from "../interfaces/Orders";
import type { IOrdersData } from "./interfaces/IOrders";

const defaultOrder = {
  total: 1,
  data: [
    {
      uid: "i1KQMgmomNXSYvll1yeGoGvHiXD2",
      id: 1,
      time: "2024-12-22 12:00",
      client: "Eloise",
      status: "started" as TStatus,
      items: [
        {
          name: "Beef Crowich",
          desc: "Emit event to notify parent to close the sidebar",
          price: 5.5,
          quantity: 1,
          image:
            "https://epicwatersgp.com/content/uploads/2020/03/croissant-beef.png",
        },
        {
          name: "Sliced Black Forest",
          desc: "Emit event to notify parent to close the sidebar",
          price: 5.0,
          quantity: 2,
          image:
            "https://www.sugarplumbakery.org/wp-content/uploads/2022/05/A92A6026-2-1200x800.png",
        },
        {
          name: "Solo Floss Bread",
          desc: "Emit event to notify parent to close the sidebar",
          price: 4.5,
          quantity: 1,
          image:
            "https://crustabakes.wordpress.com/wp-content/uploads/2010/10/floss-bread-11.jpg",
        },
      ],
      subtotal: 20,
      total: 22,
      discount: 2,
      taxRate: 0.1,
    },
  ],
};

export interface IState {
  ordersData: IOrdersData;
  tableLimit: number;
  tablePage: number;
}

export const state = (): IState => ({
  ordersData: defaultOrder,
  tableLimit: 10,
  tablePage: 1,
});
