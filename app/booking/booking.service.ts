import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { IReservationContainer, IReservation } from '../IReservationContainer';
import * as moment from 'moment/moment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookingService {
	reservationContainers: IReservationContainer[];
	reservationContainer: IReservationContainer;
    selectedReservation: IReservation;
    
    constructor (private http: Http) {}

    private putUrl = 'http://localhost:61520/api/reservations/';
    
    newReservation(id, selectedReservation: IReservation) {
        let body = JSON.stringify({"id": id, "selectedReservation": selectedReservation });
        let headers = new Headers ({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.putUrl + id, selectedReservation, options)
                        .toPromise()
                        .then((res) => alert('Reservation added'))
                        .catch((reservation) => {
							selectedReservation.reserved = false;
							alert('Error connecting to server');
                        });
    }
}