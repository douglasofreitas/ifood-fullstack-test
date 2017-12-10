import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.css']
})
export class OrderFilterComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  searchForm(form) {
    console.log('searchForm()');
    console.log($('#orderStartDate').val());
    let orderFilter = {
      start_date: $('#orderStartDate').val(),
      end_date: $('#orderEndDate').val(),
      client_name: $('#clientName').val(),
      client_phone: $('#clientPhone').val(),
      client_email: $('#clientEmail').val(),
    };

    this.orderService.setOrderFilter(orderFilter);
  }

  ngOnInit() {
    
  }

}
