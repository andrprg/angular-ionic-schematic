import { AlertMessage, MessagesService } from './messages.service';
import { filter } from 'rxjs';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-messages',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class MessagesComponent {
  readonly messageService = inject(MessagesService);
  readonly alertController = inject(AlertController);
  readonly destroyRef = inject(DestroyRef);
  
  constructor() {
   this.messageService.message$.pipe(
      filter(Boolean),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((message) => {
      this.presentAlert(message);
    });
    
  }
  
  async presentAlert(objMessage: AlertMessage) {
    const { header, message } = objMessage;
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    
    await alert.present();
    alert.onDidDismiss().then(_ => this.messageService.clear());
  }
}
