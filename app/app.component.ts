import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    providers: [ DataService ]
})

export class AppComponent {

    constructor() {
    }
}