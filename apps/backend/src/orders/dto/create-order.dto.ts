import { CartItem } from '@fullsend/types';
export class CreateOrderDto {
  customerName: string;
  address: string;
  phone: string;
  paymentMethod: string;
  items: CartItem[];
}
