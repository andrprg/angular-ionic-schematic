import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AlertMessage {
  header: string;
  message: string;
};
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private subjectMessages = new BehaviorSubject<AlertMessage | null>(null);
  message$ = this.subjectMessages.asObservable();

  showMessage(header: string, message: string): void {
    this.subjectMessages.next({header, message});
  }

  clear(): void {
    console.log('CLEAR');
    this.subjectMessages.next(null);
  }
}
