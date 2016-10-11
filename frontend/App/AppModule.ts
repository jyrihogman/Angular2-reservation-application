import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }    from '@angular/http';

import { AppComponent }   from './AppComponent';

import { CalendarComponent } from './calendar/CalendarComponent';
import { BookingComponent } from './booking/BookingComponent';



@NgModule({
    imports:      [ BrowserModule, FormsModule, RouterModule, HttpModule ],
    declarations: [ AppComponent, CalendarComponent, BookingComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }