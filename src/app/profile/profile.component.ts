import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material";
import {
    CoreService,
    FileManagerService,
    GeocodingService,
    UserManagerService,
    NotificationService,
    AuthService,
    I18nService
} from "@app/shared";
import { ConfirmDialog } from "@app/layout/confirm-dialog/confirm-dialog.component";
import { UploadProfileImageDialog } from "./upload-profile-image-dialog/upload-profile-image-dialog.component";
import { scaleAnimation } from "@app/animations/scale.animation";
import { Subject, Observable, throwError } from "rxjs";
import { tap, catchError, takeUntil, map } from "rxjs/operators";
import { User } from "@app/models/user";
import { merge } from "lodash";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    animations: [scaleAnimation]
})
export class ProfileComponent implements OnInit, OnDestroy {
    private _changed: boolean = false;
    private _saved: boolean = false;

    destroy = new Subject<any>();

    address$: Observable<any>;
    hide: boolean = true;
    id = undefined;
    image: File = null;
    locale: string;
    profileForm: FormGroup;
    showFields: boolean = false;
    user$: Observable<User>;
    user: User;

    constructor(
        private _auth: AuthService,
        private _core: CoreService,
        private _dlg: MatDialog,
        private _fm: FileManagerService,
        private _geo: GeocodingService,
        private _i18n: I18nService,
        private _ntf: NotificationService,
        private _route: ActivatedRoute,
        private _userSVC: UserManagerService
    ) {
        this.profileForm = this._userSVC.form();

        this.profileForm.valueChanges
            .pipe(takeUntil(this.destroy))
            .subscribe(_ => {
                this._changed = true;
            });
    }

    ngOnInit(): void {
        this.locale = this._i18n.language;

        const id = this._route.snapshot.params["id"] || undefined;

        if (id) {
            this.user$ = this._userSVC.read(id);
        } else {
            this.user$ = this._auth.user.pipe(
                tap((user: any) => {
                    if (!user) return;
                    this.profileForm.patchValue(user);
                    this.user = user;
                    this._changed = false;
                    this._saved = false;
                    this.address$ = this._geo.geocode(user.lastSignInLocation);
                }),
                catchError(err =>
                    err.code === 404 ? throwError("Not found") : throwError(err)
                )
            );
        }

        this._fm.downloadURL.pipe(takeUntil(this.destroy)).subscribe(url => {
            this.profileForm.controls["photoURL"].setValue(url);
        });
    }

    private opendDiscardDlg(): Observable<boolean> {
        let dialogRef = this._dlg.open(ConfirmDialog, {
            data: { answer: false, title: "dialog.discard_changes" }
        });

        return dialogRef.afterClosed().pipe(
            map(result => {
                if (!result) return false;
                return result.answer;
            })
        );
    }

    private uploadAvatar(file, uid) {
        const path = `uploads/avatar/${uid}_${new Date().getTime()}`;

        this._fm.upload(file, path);
        this._fm.snapshot.pipe(takeUntil(this.destroy)).subscribe(_ => {
            return;
        });
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this._changed && !this._saved) {
            return this.opendDiscardDlg();
        } else {
            this._core.isLoading.next(true);
            return true;
        }
    }

    togglePasswordFields() {
        this.showFields = !this.showFields;
    }

    save() {
        const inputValue = this.profileForm.value;

        let data = merge({}, this.user, inputValue);

        this._userSVC
            .update(data)
            .then(_ => this._ntf.open("toast.profile", "toast.close"));
        this._saved = true;
    }

    openUploadAvatarDlg(uid): void {
        let dialogRef = this._dlg.open(UploadProfileImageDialog, {
            panelClass: "custom-dialog",
            data: { file: this.image }
        });

        dialogRef
            .afterClosed()
            .pipe(takeUntil(this.destroy))
            .subscribe(result => {
                if (result && result.file) this.uploadAvatar(result.file, uid);
            });
    }

    deleteProfileImg($event: Event, url: string) {
        $event.preventDefault();
        if (url.search("https://firebasestorage.googleapis.com")) {
            this.profileForm.controls["photoURL"].setValue("");
            return;
        }

        url = decodeURIComponent(url);
        const parts = url.split("?")[0].split("/");
        const fileName = parts[parts.length - 1];
        const path = "uploads/avatar";

        this._fm
            .delete(fileName, path)
            .then(_ => {
                this.profileForm.controls["photoURL"].setValue("");
            })
            .catch(err => {
                this._ntf.open("toast.firebase." + err.code_, "toast.close");
            });
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
