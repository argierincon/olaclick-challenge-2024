import type { TStatus } from "../../interfaces/Orders";

export interface IOrderItem {
  name:     string;
  desc:     string;
  price:    number;
  quantity: number;
  image:    string;
}

export interface IOrder {
  uid:      string;
  id:       number;
  time:     string;
  client:   string;
  status:   TStatus;
  items:    IOrderItem[];
  subtotal: number;
  total:    number;
  discount: number;
  taxRate:  number;
}
