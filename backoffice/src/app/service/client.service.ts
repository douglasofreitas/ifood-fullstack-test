import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Client } from '../model/client';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class ClientService {

  private clientsUrl = 'http://localhost:8081/v1/clients';  // URL to web api
  
  constructor(
    private http: HttpClient,
    ) { }
  
  getClients() {

    return this.http.get<Client[]>(this.clientsUrl, httpOptions)
      .pipe(
        tap(result => {
          this.log(`fetched clients`, result);
        }),
        catchError(this.handleError('getClients', []))
      );

  }

  /** Log a HeroService message with the MessageService */
  private log(message: string, obj: object) {
    console.log('ClientService: ' + message);
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
