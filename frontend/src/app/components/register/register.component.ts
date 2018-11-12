import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[AuthService]
})
export class RegisterComponent implements OnInit {

  showSuccessMessage:boolean;
  serverErrorMessage:string;
  username: String;
  email: String;
  password: String;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  registerData(form:NgForm) {

    const user = {
      username: this.username,
      email: this.email,
      password: this.password


    };
    this.authService.registerUser(user).subscribe(
      res=>{
        console.log(res);
        this.showSuccessMessage= true;
        setTimeout(()=>this.showSuccessMessage=false,4000);
      },
      err=>{
        if(err.status=402) {
          this.serverErrorMessage = err.error.join('<br/>');
        }else{
          this.serverErrorMessage = "something wrong ";
        }
      }

    );

  }
}
