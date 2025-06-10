// file: apps/backend/src/orders/dto/create-order.dto.ts
import { CartItem } from '@fullsend/types'; // This won't work yet, we'll fix it next
export class CreateOrderDto {
  customerName: string;
  address: string;
  phone: string;
  paymentMethod: string;
  items: CartItem[];
}
