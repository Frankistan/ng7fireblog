import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { extract } from "./shared/services/i18n.service";
import { FiltersComponent } from "./layout/filters/filters.component";
import { LoginComponent } from "./auth/login/login.component";
import { PostFormComponent } from "./posts/post-form/post-form.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostsComponent } from "./posts/posts.component";
import { PostShowComponent } from "./posts/post-show/post-show.component";
import { ProfileComponent } from "./profile/profile.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { SearchbarComponent } from "./layout/searchbar/searchbar.component";
import { SettingsComponent } from "./settings/settings.component";
import { SignupComponent } from "./auth/signup/signup.component";
//GUARDS
import { AuthGuard } from "./shared/guards/auth.guard";
import { DiscardChangesGuard } from "./shared/guards/discard-changes.guard";
import { LoggedInGuard } from "./shared/guards/logged-in.guard";

// FUENTE: https://stackoverflow.com/questions/39601026/angular-2-scroll-to-top-on-route-change/51915623#51915623

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
            title: extract("home"),
            animation: {
                value: "home"
            }
        }
    },
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
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard],
        canDeactivate: [DiscardChangesGuard],
        data: {
            title: extract("profile"),
            animation: {
                value: "profile"
            }
        }
    },
    {
        path: "profile/:id",
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
            title: extract("profile-visiting"),
            animation: {
                value: "profile"
            }
        }
    },
    {
        path: "filters",
        component: FiltersComponent,
        outlet: "filtersPopup"
    },
    {
        path: "search",
        component: SearchbarComponent,
        canActivate: [AuthGuard],
        outlet: "search"
    },
    {
        path: "posts",
        component: PostsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "",
                component: PostListComponent,
                data: {
                    title: extract("posts.list"),
                    animation: {
                        value: "posts"
                    }
                }
            },
            {
                path: "create",
                component: PostFormComponent,
                canDeactivate: [DiscardChangesGuard],
                data: {
                    title: extract("posts.create"),
                    animation: {
                        value: "create"
                    }
                }
            },
            {
                path: ":id",
                component: PostShowComponent,
                data: {
                    title: extract("posts.show"),
                    animation: {
                        value: "show"
                    }
                }
            },
            {
                path: ":id/edit",
                component: PostFormComponent,
                canDeactivate: [DiscardChangesGuard],
                data: {
                    title: extract("posts.edit"),
                    animation: {
                        value: "edit"
                    }
                }
            }
        ]
    },
    // {
    //     path: 'apps', component: CrmRciComponent, canActivate: [AuthGuard],
    //     data: {
    //         title: extract('apps'),
    //         animation: {
    //             value: 'apps',
    //         }
    //     }
    // },
    {
        path: "settings",
        component: SettingsComponent,
        canActivate: [AuthGuard],
        canDeactivate: [DiscardChangesGuard],
        data: {
            title: extract("settings"),
            animation: {
                value: "settings"
            }
        }
    },

    // otherwise redirect to home
    { path: "**", redirectTo: "" }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: "enabled" // Add options right here
        })
    ],
    providers: [AuthGuard, DiscardChangesGuard, LoggedInGuard],
    exports: [RouterModule]
})
export class AppRoutingModule {}
