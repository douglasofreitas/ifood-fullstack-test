import { Item } from './item';

export class Order {
  id: string;
  clientId: string;
  restaurantId: string;
  createdAt: Date;
  confirmedAt: Date;
  items: Item[];

  constructor(
    id: string, 
    clientId: string, 
    restaurantId: string, 
    createdAt: Date, 
    confirmedAt: Date, 
    items: Item[]){

    this.id = id;
    this.clientId = clientId;
    this.restaurantId = restaurantId;
    this.createdAt = createdAt;
    this.confirmedAt = confirmedAt;
    this.items = items;
  }
}
