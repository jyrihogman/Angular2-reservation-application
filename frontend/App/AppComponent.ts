import { Component } from '@angular/core';
import { DataService } from './DataService';

@Component({
    selector: 'my-app',
    templateUrl: './app/AppComponent.html',
    providers: [ DataService ]
})

export class AppComponent {

    constructor() {
    }
}