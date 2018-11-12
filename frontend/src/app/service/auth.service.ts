import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: any;

  constructor(private http: HttpClient) { }

  registerUser(users) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post("http://localhost:3001/login/signup",users,{headers:headers});

  }
}
