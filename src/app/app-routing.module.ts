import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: DashboardComponent,
        data: {
            title: "home",
            animation: {
                value: "home"
            }
        }
    },
    // otherwise redirect to home
    { path: "**", redirectTo: "" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
