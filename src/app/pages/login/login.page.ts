import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/services/login.service';
import { AppState } from 'src/store/app.reducer';
import * as loginActions from 'src/store/actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private login: LoginService,
  ) {

    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.login.estaLogeado()) {
      this.router.navigate(['home']);
    }
  }

  onSubmit() {
    const data: any = {
      usuario: this.loginForm.get('usuario').value,
      password: this.loginForm.get('password').value,
    };
    this.login.iniciarLogin(data)
    if (this.login.estaLogeado()) {
      this.router.navigate(['home']);
    }
    this.loginForm.reset();
  }

}
