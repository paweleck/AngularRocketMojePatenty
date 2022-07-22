import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginContext } from '@app/auth/authentication.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(context: LoginContext): Observable<string> {
    return this.httpClient.get('/api/login').pipe(
      map((body: any) => body),
      catchError((err) => of(err))
    );
  }
}
