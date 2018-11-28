import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth.service';
import { NotificationService } from '@app/shared/services/notification.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _ntf: NotificationService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._auth.isAuthenticated.pipe(map<boolean, boolean>((isAuthenticated: boolean) => {
            if (!isAuthenticated) {
                this._ntf.open('toast.server.access_denied', 'toast.close', 1500);
                // this._router.navigate(['/login']);

                // not logged in so redirect to login page with the return url and return false
                this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            }
            return isAuthenticated;
        }));
    }
}
