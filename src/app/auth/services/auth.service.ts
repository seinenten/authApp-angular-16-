import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environments';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { AuthStatus, LoginResponse, User } from '../interfaces/auth-index';
import { CheckTokenResponse } from '../interfaces/cheack-token.response';
import { RegisterResponse } from '../interfaces/register-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //?inyeccion
  private http = inject( HttpClient );
  
  private readonly baseUrl: string = environment.baseUrl;

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  //TODOS en lugar de hacer los gets desestructurados
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor(){
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token:string): boolean{
    //? para que nos sirve la verision mejor la eliminamos
    const { __v, ...finaluser } = user; 
    //? ``````
    this._currentUser.set(finaluser);
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem( 'token', token );

    return true
  }


  login( email: string, password: string ): Observable<boolean>{

    const url = `${this.baseUrl}/auth/login`;
    //? const body = {email: email,password: password } redundante
    const body = { email , password };

    return this.http.post<LoginResponse>(url,body)
      .pipe(
        map( ({ user, token }) =>  this.setAuthentication(user,token) ),
        // Todo: errores
        catchError(err => throwError( () => err.error.message ))
      );
  }

  register(email:string, name:string, password:string): Observable<boolean>{

    const url = `${this.baseUrl}/auth/register`;
    const body= { email, password, name };

    return this.http.post<RegisterResponse>( url, body )
            .pipe(
              map( ({ user, token }) => this.setAuthentication( user, token ) ),
              catchError( err => throwError( () => err.error.message ))
            );
  }


  checkAuthStatus():Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;

    const token = localStorage.getItem('token');
    //? Si no existe el token entonces no esta identificado
    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>( url,{headers} )
            .pipe(
              map( ({token, user  }) => this.setAuthentication(user,token) ),
              //error
              catchError( () => {
                this._authStatus.set(AuthStatus.notAuthenticated);
                return of(false);
              })
            );

  }

  logout(){
    localStorage.removeItem('token');
    this._currentUser.set( null );
    this._authStatus.set( AuthStatus.notAuthenticated );
  }


  //const url = `${this.baseUrl}/`
}
