import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { NotificationService } from "./notification.service";
import { Observable } from "rxjs";
import { User } from "firebase";

@Injectable({
    providedIn: "root"
})
export class UserManagerService {
    constructor(
        private _afAuth: AngularFireAuth,
        private _db: AngularFirestore,
        private _ntf: NotificationService
    ) {}

    private get currentUser() {
        return this._afAuth.auth.currentUser;
    }

    read(id: string): Observable<User> {
        return this._db.doc<User>(`users/${id}`).valueChanges();
    }

    async update(user: any): Promise<void> {
        try {
            if (user.password) {
                await this.currentUser.updatePassword(user.password);
                await this.currentUser.reload();
            }

            return this._db.doc(`users/${user.uid}`).set(user, { merge: true });
        } catch (error) {
            this.errorHandler(error.code);
        }
    }

    create(user: any): Promise<void> {
        return this._db.doc(`users/${user.uid}`).set(user, { merge: true });
    }

    private errorHandler(error: any) {
        this._ntf.open("toast.firebase." + error, "toast.close");
    }
}
