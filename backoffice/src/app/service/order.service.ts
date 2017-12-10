import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Order } from '../model/order';
import { Item } from '../model/item';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class OrderService {

  private ordersUrl = 'http://localhost:8082/v1/orders';  // URL to web api
  private orderFilter = {};
  public orderListComponent: Object;

  constructor(
    private http: HttpClient) { }
  
  getOrders() {
    console.log('OrderService - this.getOrders');
    return this.http.get<Order[]>(this.ordersUrl, httpOptions)
      .pipe(
        tap(result => {
          this.log(`fetched orders`, result);
        }),
        catchError(this.handleError('getOrders', []))
      );
  }

  setOrderFilter(orderFilter){
    this.orderFilter = orderFilter;
    this.orderListComponent['refreshOrders']();
  }

  getOrderFilter(){
    return this.orderFilter;
  }

  /* GET orders whose name contains search term */
  searchHeroes(term: string): Observable<Order[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Order[]>(`${this.ordersUrl}/?name=${term}`).pipe(
      tap(result => this.log(`found orders matching "${term}"`, result)),
      catchError(this.handleError<Order[]>('searchOrders', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string, obj: object) {
    console.log('OrderService: ' + message);
    console.log(obj);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
