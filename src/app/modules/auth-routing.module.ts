import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "@app/auth/auth.component";
import { extract } from "@app/shared/services/i18n.service";
import { LoggedInGuard } from "@app/shared/guards/logged-in.guard";
import { LoginComponent } from "@app/auth/login/login.component";
import { ResetPasswordComponent } from "@app/auth/reset-password/reset-password.component";
import { SignupComponent } from "@app/auth/signup/signup.component";

const routes: Routes = [
    {
        path: "auth",
        component: AuthComponent,
        canActivate: [LoggedInGuard],
        children: [
            {
                path: "login",
                component: LoginComponent,
                data: {
                    title: extract("login"),
                    animation: {
                        value: "login"
                    }
                }
            },
            {
                path: "signup",
                component: SignupComponent,
                data: {
                    title: extract("signup"),
                    animation: {
                        value: "signup"
                    }
                }
            },
            {
                path: "reset-password",
                component: ResetPasswordComponent,
                data: {
                    title: extract("reset_password"),
                    animation: {
                        value: "reset-password"
                    }
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [LoggedInGuard],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
