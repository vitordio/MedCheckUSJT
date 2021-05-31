import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from
  '@angular/common/http'
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ErroComponent } from './erro/erro/erro.component';
@Injectable()
export class ErroInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((erro: HttpErrorResponse) => {
        let msg = "Erro. Tente novamente mais tarde."
        if (erro.error.mensagem) {
          msg = erro.error.mensagem;
        }
        this.dialog.open(ErroComponent, {
          data: {
            message: msg
          }
        })
        return throwError(erro);
      }));
  }
}
