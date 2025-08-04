import { inject, Injectable } from '@angular/core';
import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { LoadingService } from 'src/app/presentation/ui/loading/loading.service';
import { delay, finalize, Observable } from 'rxjs';

export const SkipLoading = 
new HttpContextToken<boolean>(() => false);

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loadingService = inject(LoadingService);
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Если запрос содержит SkipLoading, то не показываем индикатор загрузки
    if (req.context.get(SkipLoading)) {
      return next.handle(req);
    }
   
    this.loadingService.loadingOn();
    
    return next.handle(req).pipe(delay(3000), finalize(() => this.loadingService.loadingOff()));
  }
}