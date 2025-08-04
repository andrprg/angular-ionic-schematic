import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MessagesComponent } from './presentation/ui/messages/messages.component';
import { LoadingComponent } from './presentation/ui/loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MessagesComponent, LoadingComponent],
})
export class AppComponent {

  constructor() {
    document.body.classList.toggle('light', true);
  }
  

}
