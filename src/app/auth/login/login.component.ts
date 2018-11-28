import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CoreService , AuthService, I18nService } from '@app/shared';
import { environment } from '@env/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hide = true;
    loginForm: FormGroup;

    size: string = "normal";
    lang: string = "es";
    theme: string = "light";
    type: string = "image";
    siteKey:string = environment.recaptcha.siteKey;

    captchaIsLoaded = false;
    captchaSuccess = false;
    captchaIsExpired = false;
    captchaResponse?: string;

    constructor(
        public auth: AuthService,
        private _fb: FormBuilder,
        public core: CoreService,
        public I18nService:I18nService
    ) { }

    ngOnInit() {
        this.loginForm = this._fb.group({
            email: ['ffontanesf@unisono.es', [Validators.required, Validators.email]],
            password: ['123456', Validators.required],
            recaptcha: ['', Validators.required]
        });
    }

    login() {
        this.auth.login(this.loginForm.value.email, this.loginForm.value.password);
    }

    socialLogin(provider: string) {
        this.auth.loginWithProvider(provider);
    }

    handleSuccess(captchaResponse: string): void {
        this.loginForm.controls['recaptcha'].setValue(captchaResponse);
    }

    handleLoad(): void {
    }

    handleExpire(): void {
        this.loginForm.controls['recaptcha'].setValue('');
    }
}