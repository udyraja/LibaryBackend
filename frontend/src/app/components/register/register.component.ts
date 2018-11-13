import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService,
              private router:Router) {
  }

  ngOnInit() {
  }

  registerData() {

    const users = {
      username: this.username,
      email: this.email,
      password: this.password


    };
    console.log(users);
    this.authService.registerUser(users).subscribe(res=>{
        this.showSuccessMessage = true;
        setTimeout(()=>this.showSuccessMessage=false,4000);
        this.router.navigate(['/login/signup']);
      },
      err=>{
        /*if(err.status=409) {
          this.serverErrorMessage = err.error.join('<br/>');
        }else{
          this.serverErrorMessage = "something wrong ";
          this.router.navigate(['/signup']);
        }*/
      }

    );

  }

 /* resetForm(form:NgForm){
    this.authService.selectedUser={
      username: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessage='';
  }*/
}
