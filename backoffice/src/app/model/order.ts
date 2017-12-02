import { Item } from './item';

export class Order {
  clientId: string;
  restaurantId: string;
  createdAt: Date;
  confirmedAt: Date;
  items: Item[];
}
