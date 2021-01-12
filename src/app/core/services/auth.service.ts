import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/delay';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';
import { UserPostDto } from '../../auth/models/userPostDto.model';
import { LoginRequest } from '../../auth/models/loginRequest.model';
import { LoginResponse } from '../../auth/models/loginResponse.model';
import { User } from '../../account/models/user.model';
import { Observable } from 'rxjs';

const baseUrl = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient,
              @Inject('LOCALSTORAGE') private localStorage: Storage) {
  }

  login(loginRequest: LoginRequest) {
    return this.httpClient.post<LoginResponse>(baseUrl + '/signin', loginRequest).pipe(
      map((userData: LoginResponse) => {
        this.localStorage.setItem('currentUser', JSON.stringify({
          token: `${userData.type} ${userData.token}`,
          username: userData.username,
          id: userData.id,
          expiration: this.getTokenExpirationDate(userData.token),
        }));
        return true;
      }));
  }

  logout(): void {
    this.localStorage.removeItem('currentUser');
  }

  singUp(user: UserPostDto): Observable<User> {
    return this.httpClient.post<User>(baseUrl + '/signup', user);
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('username');
    return !(user === null);
  }

  getCurrentUser(): LoginResponse {
    return JSON.parse(this.localStorage.getItem('currentUser'));
  }

  private getTokenExpirationDate(token: string): Date {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);

    if (decodedToken.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }
}
