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
  orderFilter: Object;

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
    this.orderFilter = {};

    this.orderService.orderListComponent = this;
    
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
        this.getOrdersList();
      });
  }

  getOrdersList(): void {
    console.log('this.getOrders - this.orderFilter', this.orderFilter);
    this.orders = new Map();
    this.ordersArray = [];
    this.orderService.getOrders()
      .subscribe(result => {
        result['_embedded'].orders.forEach((order, index) => {
          let itens = [];
          let insertOrderList = true;
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

          //check if order enter in list
          if(this.orderFilter.hasOwnProperty('client_name')){
            if(this.clients.get(order.clientId).name.indexOf(this.orderFilter['client_name']) < 0) {
              insertOrderList = false;
            }
          }
          if(this.orderFilter.hasOwnProperty('client_phone')){
            if(this.clients.get(order.clientId).phone.indexOf(this.orderFilter['client_phone']) < 0) {
              insertOrderList = false;
            }
          }
          if(this.orderFilter.hasOwnProperty('client_email')){
            if(this.clients.get(order.clientId).email.indexOf(this.orderFilter['client_email']) < 0) {
              insertOrderList = false;
            }
          }
          if(this.orderFilter.hasOwnProperty('start_date')){
            console.log(new Date(this.orderFilter['start_date']), new Date(order['createdAt']));
            if(new Date(this.orderFilter['start_date']) > new Date(order['createdAt'])) {
              insertOrderList = false;
            }
          }
          if(this.orderFilter.hasOwnProperty('end_date')){
            if(new Date(this.orderFilter['end_date']) < new Date(order['createdAt'])) {
              insertOrderList = false;
            }
          }

          if(insertOrderList){
            this.orders.set(orderId, newOrder);
            this.ordersArray.push(newOrder);
          }
        });
        console.log('this.orders', this.orders);
        console.log('this.ordersArray', this.ordersArray);
      });
  }

  refreshOrders(){
    console.log('refreshOrders...start');
    this.orderFilter = this.orderService.getOrderFilter();
    this.getOrdersList();
    console.log('refreshOrders...end');
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
