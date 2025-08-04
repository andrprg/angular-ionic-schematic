import { Component, inject } from '@angular/core';
import { EllipsisDirective } from 'src/app/core/directives/ellipsis.directive';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FakeService } from 'src/app/repositories/fake.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, EllipsisDirective]
})
export class Tab2Page {
  fake = inject(FakeService);
  
  constructor() {    
    this.fake.getFakeUsers().subscribe((data) => {
      console.log('USERS:', data);
    });    
  }
  
}
