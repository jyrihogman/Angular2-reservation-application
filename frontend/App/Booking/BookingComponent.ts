import { Component } from '@angular/core';

import { IReservationContainer, IReservation } from '../IReservationContainer';
import { BookingService } from './BookingService';
import { DataService} from '../DataService';
import * as moment from 'moment/moment';
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: 'bookingForm',
    templateUrl: './app/booking/BookingComponent.html',
	providers: [BookingService]
})

export class BookingComponent{
	email: string;
	date: string;
	phone: string;
	firstName: string;
	lastName: string;
    matchPattern: RegExp;
	emailPattern: RegExp;
	phonePattern: RegExp;
	selected: IReservationContainer;
	selectedReservation: IReservation;
	calendarDate: moment.Moment;
	stringDate: string;
	errorDate: string;
	reservations: any;
    subscription: Subscription;

	constructor (private dataService: DataService, private bookingService: BookingService) {
		this.selectedReservation = { 'id': '', 'time': '', 'email': '', 'firstname': '', 'lastname': '', 'phone': '', 'reserved': false };
		this.subscription = dataService.selected$.subscribe(
			result => { 
				this.calendarDate = result;
				this.selected = this.dataService.getReservationContainer(this.calendarDate);
				this.selectedReservation.id = '';
				this.formData();
		});
		this.matchPattern = new RegExp('^[^\\d &\/\\#,+()$~%.:;_*?<>{} ]+[^\\d &\/\\#,+()$~%.:;_*?<>{} ]$');
		this.emailPattern = new RegExp('[^\d &\/\\#,+()$~%:;_*?<>{} .0-9]$');
		this.phonePattern = new RegExp('[0-9+-0-9]$');
	}

	submit() {
		if (this.selectedReservation.id) {
			this.selectedReservation.reserved = true;

			this.bookingService.newReservation(this.selectedReservation.id, this.selectedReservation);
		}
    }

	formData() {
		if (this.selected)
			this.reservations = this.selected.reservations;
		else
			this.reservations = null;
	}

	dateToMoment() {
		if (!this.selected || this.selected.reservations.filter(available => available.reserved === false).length == 0)
			return this.errorDate = 'Nothing available for this day.';
			
		 return this.stringDate = 'Reservations available for ' + moment(this.calendarDate).format('dddd, MMMM Do YYYY');
	}
}
