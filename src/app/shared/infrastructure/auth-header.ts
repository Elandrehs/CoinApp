import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {AuthService} from '../services/authentication.service';

export const AuthHeader: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set(`Authorization`, `Bearer ${token}`)
    });
    console.log('✅ Token agregado:', authReq.headers.get('Authorization')); // Debug
    return next(authReq);
  }

  return next(req);
};
