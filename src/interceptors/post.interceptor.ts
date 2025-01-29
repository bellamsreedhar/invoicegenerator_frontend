import { HttpInterceptorFn } from '@angular/common/http';

export const postInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('auth_token');
  if(req.url.includes('login') || req.url.includes('login')){
    return next(req);
  }
  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  });
  return next(modifiedReq);
};
