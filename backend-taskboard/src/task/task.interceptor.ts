import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HistoryService } from '../history/history.service';

@Injectable()
export class TaskInterceptor implements NestInterceptor {
  constructor(private historyService: HistoryService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(async (response) => {
        if (!(response instanceof Observable)) {
          const operation = context.getHandler().name;

          if (operation === 'create') {
            this.historyService.createHistoryEntry('added', response);
          } else if (operation === 'update') {
            this.historyService.updateHistoryEntry('updated', response);
          } else if (operation === 'remove') {
            this.historyService.deleteHistoryEntry('deleted', response);
          }
        }
      }),
    );
  }
}
