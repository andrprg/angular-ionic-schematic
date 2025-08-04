import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoadingService } from './loading.service';
import { IonSpinner } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonSpinner, AsyncPipe],
})
export class LoadingComponent {
  readonly loadingService = inject(LoadingService);
}
