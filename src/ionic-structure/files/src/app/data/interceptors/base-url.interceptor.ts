import { HttpInterceptorFn } from '@angular/common/http';
import { BASE_URL } from 'src/environments/environment';

export const BaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    url: `${BASE_URL}${req.url}`,
  });
  return next(req);
};
