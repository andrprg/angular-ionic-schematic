import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonToggle } from '@ionic/angular/standalone';
import { MessagesService } from '../ui/messages/messages.service';
import { LoadingService } from '../ui/loading/loading.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonToggle, IonButton, IonHeader, IonToolbar, IonTitle, IonContent ],
})
export class Tab1Page {
  messageService = inject(MessagesService);
  loaderService = inject(LoadingService);

  onError() {
    this.messageService.showMessage('Ошибка', 'Произошла ошибка');
  }  

  onLoader() {
    this.loaderService.loadingOn();
    setTimeout(() => this.loaderService.loadingOff(), 5000);
  }

  toggle(event: CustomEvent ) {
    const check = event.detail.check;    
    document.body.classList.toggle('dark', check);
    document.body.classList.toggle('light', !check);
  }

}
