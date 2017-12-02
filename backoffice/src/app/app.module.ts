import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import {JsonpModule, Jsonp, Response} from '@angular/http';

import { AppComponent } from './app.component';
import { OrderFilterComponent } from './order-filter/order-filter.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

import { OrderService } from './service/order.service';

@NgModule({
  declarations: [
    AppComponent,
    OrderFilterComponent,
    OrderListComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    JsonpModule
  ],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
