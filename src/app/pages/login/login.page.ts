import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private login: LoginService
  ) {

    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    }); 
  }




  onSubmit() {
    const data: any = {
      usuario: this.loginForm.get('usuario').value,
      password: this.loginForm.get('password').value,
    };

    if(this.login.isLogged(data)){
      this.router.navigate(['home']);
    }
  
    this.loginForm.reset();
    
    

  }

}
