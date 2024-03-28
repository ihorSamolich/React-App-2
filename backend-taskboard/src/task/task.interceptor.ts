import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TaskInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();

    const request = context.switchToHttp().getRequest();
    console.log('Request data:', request.body); // Логувати дані запиту

    return next.handle().pipe(
      tap((response) => {
        if (!(response instanceof Observable)) {
          console.log('Response data:', response);
        }
        console.log(`After... ${Date.now() - now}ms`);
      }),
    );
  }
}
