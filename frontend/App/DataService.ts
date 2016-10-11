import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { IReservationContainer, IReservation } from './IReservationContainer';
import * as moment from 'moment/moment';

import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
	reservationContainers: IReservationContainer[];
	reservationContainer: IReservationContainer;
    dateSelected: moment.Moment;
    private selectedDay = new Subject<moment.Moment>();
    
    selected$ = this.selectedDay.asObservable();

    constructor (private http: Http) {
        this.dateSelected = moment(this.selectedDay.next);
        this.http.get('http://ng2booking.azurewebsites.net/api/reservations')
            .toPromise()
            .then((data => this.reservationContainers = data.json()))
            .catch((data) => alert('Error connecting to server'));
        this.getReservationContainer(this.dateSelected);
    }
    
    getAvailability(date) {
        return !this.reservationContainers? null : this.reservationContainers.filter(container => container.date === date.format('YYYY-MM-DD')).length;
    }

    getReservationContainer(date: moment.Moment) {
        return !this.reservationContainers? null : this.reservationContainers.filter(container => container.date === date.format('YYYY-MM-DD'))[0];
    }

    shareDate(date: moment.Moment) {
        this.selectedDay.next(date);
    }
}