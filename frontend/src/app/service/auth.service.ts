import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: any;

  constructor(private http: HttpClient) { }

  registerUser(users) {
    //let headers = new HttpHeaders();
    //headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3001/login/signup',users,{headers: new HttpHeaders().set('Content-Type','application/json')});

  }
}
