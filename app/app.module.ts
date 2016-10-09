import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }    from '@angular/http';

import { AppComponent }   from './app.component';

import { CalendarComponent } from './calendar/calendar.component';
import { BookingComponent } from './booking/booking.component';



@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule, HttpModule ],
    declarations: [ AppComponent, CalendarComponent, BookingComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }