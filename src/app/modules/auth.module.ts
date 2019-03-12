import { NgModule } from '@angular/core';
import { AuthComponent } from '@app/auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '@app/auth/login/login.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from '@app/auth/reset-password/reset-password.component';
import { SharedModule } from './shared.module';
import { SignupComponent } from '@app/auth/signup/signup.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ResetPasswordComponent,
    SignupComponent,
  ],
  imports: [
    AuthRoutingModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class AuthModule { }
