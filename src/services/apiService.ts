import type { TStatus } from "../interfaces/Orders";
import type { IOrder, IOrdersData } from "../store/interfaces/IOrders";

interface ITableParams {
  limit: number;
  page: number;
}

export const fetchOrders = (params: ITableParams): Promise<IOrdersData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = {
        total: 39,
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
          {
            uid: "Fj2sD4Gv1oJvZ9XvKoK5p6G3qH1L",
            id: 2,
            time: "2024-12-22 12:00",
            client: "Oliver",
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
            discount: 1.5,
            taxRate: 0.08,
          },
          {
            uid: "x7VbY7v9HVoJi2LxWm2XZg0CdJlK",
            id: 3,
            time: "2024-12-22 12:00",
            client: "Ava",
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
            discount: 1.8,
            taxRate: 0.09,
          },
          {
            uid: "S6FzLp9mNqYtP3h2Vh9Gi9XzCwRo",
            id: 4,
            time: "2024-12-22 12:00",
            client: "Liam",
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
            discount: 2.2,
            taxRate: 0.1,
          },
          {
            uid: "V6d4J2XoQ5sLKr0mCz1Fg6Zb3oPi",
            id: 5,
            time: "2024-12-22 12:00",
            client: "Isla",
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
            discount: 1.7,
            taxRate: 0.07,
          },
          {
            uid: "Y0tVz1oFwL4Yh2Q6Gn3dV9Xy1XjA",
            id: 6,
            time: "2024-12-22 12:00",
            client: "Mia",
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
            discount: 1.4,
            taxRate: 0.05,
          },
          {
            uid: "H8D5k9J1G4B2zQVrRoFf8Xw7P9nD",
            id: 7,
            time: "2024-12-22 12:00",
            client: "Ethan",
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
            discount: 2.1,
            taxRate: 0.09,
          },
          {
            uid: "Z3g2L5FnDqVoX9Km6O1Y4vH5Jm8J",
            id: 8,
            time: "2024-12-22 12:00",
            client: "Sophia",
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
            discount: 2.0,
            taxRate: 0.1,
          },
          {
            uid: "W3tL7V8bK1m0Qz1G9RzJ9F0D3oXs",
            id: 9,
            time: "2024-12-22 12:00",
            client: "Mason",
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
            discount: 2.3,
            taxRate: 0.08,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 10,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 11,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 12,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 13,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 14,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 15,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 16,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 17,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 18,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 19,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 20,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 21,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 22,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 23,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 24,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 25,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 26,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 27,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 28,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 29,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 30,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 31,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 32,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 33,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 34,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 35,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 36,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 37,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 38,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
          {
            uid: "F4d1N9Lm3P6V9D8z1XrJ7oWqK4JY",
            id: 39,
            time: "2024-12-22 12:00",
            client: "Lily",
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
            discount: 2.4,
            taxRate: 0.1,
          },
        ],
      };

      const filteredData = orders.data.slice(0, params.limit);

      resolve({ data: filteredData, total: orders.total });
    }, 1000);
  });
};

interface IOrderParams {
  id: number;
}

export const fetchOrderDetail = (params: IOrderParams): Promise<IOrder> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderDetail = {
        uid: "i1KQMgmomNXSYvll1yeGoGvHiXD2",
        id: params.id,
        time: "2024-12-22 12:00",
        client: "Eloise",
        status: "started" as "started",
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
      };

      resolve(orderDetail);
    }, 1000);
  });
};
