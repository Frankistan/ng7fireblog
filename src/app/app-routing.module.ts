import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DiscardChangesGuard } from "./core/guards/discard-changes.guard";
import { LoggedInGuard } from "./core/guards/logged-in.guard";
import { LoginComponent } from "./auth/login/login.component";
import { PostFormComponent } from "./posts/post-form/post-form.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostShowComponent } from "./posts/post-show/post-show.component";
import { ProfileComponent } from "./profile/profile.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { SettingsComponent } from "./settings/settings.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { GridViewComponent } from "./posts/post-list/grid-view/grid-view.component";

const routes: Routes = [
    {
        path: '', pathMatch: 'full', component: DashboardComponent, data: {
            title: 'home',
            animation: {
                value: 'home',
            }
        }
    },
    {
        path: 'login', component: LoginComponent,
        canActivate: [LoggedInGuard],
        data: {
            title: 'login',
            animation: {
                value: 'login',
            }
        }
    },
    {
        path: 'signup', component: SignupComponent,
        canActivate: [LoggedInGuard],
        data: {
            title: 'signup',
            animation: {
                value: 'signup',
            }
        }
    },
    {
        path: 'reset-password', component: ResetPasswordComponent,
        canActivate: [LoggedInGuard],
        data: {
            title: 'reset_password',
            animation: {
                value: 'reset-password',
            }
        }
    },
    {
        path: 'profile', component: ProfileComponent,
        canActivate: [AuthGuard], canDeactivate: [DiscardChangesGuard],
        data: {
            title: 'profile',
            animation: {
                value: 'profile',
            }
        }
    },
    {
        path: 'profile/:id', component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'profile-visiting',
            animation: {
                value: 'profile',
            }
        }
    },
    {
        path: 'posts', component: PostListComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'posts.list',
            animation: {
                value: 'posts',
            }
        }
    },
    {
        path: 'posts/create', component: PostFormComponent,
        canActivate: [AuthGuard],canDeactivate: [DiscardChangesGuard],
        data: {
            title: 'posts.create',
            animation: {
                value: 'create',
            }
        }
    },
    {
        path: 'posts/:id', component: PostShowComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'posts.show',
            animation: {
                value: 'show',
            }
        }
    },
    {
        path: 'posts/:id/edit', component: PostFormComponent,
        canActivate: [AuthGuard],canDeactivate: [DiscardChangesGuard],
        data: {
            title: 'posts.edit',
            animation: {
                value: 'edit',
            }
        }
    },
    // {
    //     path: 'apps', component: CrmRciComponent, canActivate: [AuthGuard],
    //     data: {
    //         title: 'apps',
    //         animation: {
    //             value: 'apps',
    //         }
    //     }
    // },
    {
        path: 'settings', component: SettingsComponent, canActivate: [AuthGuard],
        data: {
            title: 'settings',
            animation: {
                value: 'settings',
            }
        }
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
