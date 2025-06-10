import { Part } from "./part";

export interface CartItem extends Part {
  quantity: number;
}
