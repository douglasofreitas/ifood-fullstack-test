import { Component, OnInit } from '@angular/core';

import { Order } from '../model/order';
import { Item } from '../model/item';
import { Client } from '../model/client';
import { OrderService } from '../service/order.service';
import { ClientService } from '../service/client.service';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Map<string, Order>;
  ordersArray: Array<Order>;
  clients: Map<string, Client>;
  clientsArray: Array<Client>;
  orderDetail: Order;

  constructor(private orderService: OrderService, 
    private clientService: ClientService,
    private modalService: ModalService) { 

    this.orders = new Map();
    this.ordersArray = [];
    this.clients = new Map();
    this.clientsArray = [];
    this.orderDetail = new Order(
      '','','',new Date(),new Date(),[]
    );
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(result => {
        console.log("result['_embedded']", result['_embedded']);
        console.log("result['_embedded'].clients", result['_embedded'].clients);
        result['_embedded'].clients.forEach((client, index) => {
          
          const clientId = client['_links']['self']['href'].split('/clients/')[1];
          const newClient = new Client(
            clientId,
            client['name'],
            client['email'],
            client['phone']
          );

          this.clients.set(clientId, newClient);
          this.clientsArray.push(newClient);

        });
        this.getOrders();
      });
  }

  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(result => {
        result['_embedded'].orders.forEach((order, index) => {
          let itens = [];
          order.items.forEach((orderItem, indexItem) => {
            console.log('orderItem', orderItem);
            itens.push(new Item(
              orderItem['description'],
              orderItem['quantity'],
              orderItem['price']
            ));
          });

          const orderId = order['_links']['self']['href'].split('/orders/')[1];
          const newOrder = new Order(
            orderId,
            order['clientId'],
            order['restaurantId'],
            order['createdAt'],
            order['confirmedAt'],
            itens,
          );

          this.orders.set(orderId, newOrder);
          this.ordersArray.push(newOrder);

        });
        console.log('this.orders', this.orders);
        console.log('this.ordersArray', this.ordersArray);
      });
      
  }

  orderValue(order: Order){
    let total = 0.0;
    order.items.forEach((item, index) => {
      total += item.quantity*item.price;
    });
    return total;
  }

  showDetail(id: string){
    console.log('showDetail', id);
    this.orderDetail = this.orders.get(id);
  }

  openModal(id: string){
    this.modalService.open(id);
  }

  closeModal(id: string){
    this.modalService.close(id);
  }

  ngOnInit() {
    this.getClients();
    
  }

}
