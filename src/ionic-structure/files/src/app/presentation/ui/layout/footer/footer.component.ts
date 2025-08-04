import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonSignInOutComponent } from '../header-buttons/button-sign-in-out/button-sign-in-out.component';
import { ButtonOrdersComponent } from '../header-buttons/button-orders/button-orders.component';
import { ButtonCartComponent } from '../header-buttons/button-cart/button-cart.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ButtonSignInOutComponent,
        ButtonOrdersComponent,
        ButtonCartComponent,
    ]
})
export class FooterComponent {

}
