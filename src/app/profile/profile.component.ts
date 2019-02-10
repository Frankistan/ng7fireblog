import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AuthService } from '@app/shared/services/auth.service';
import { CoreService } from '@app/shared/services/core.service';
import { FileManagerService } from '@app/shared/services/file-manager.service';
import { NotificationService } from '@app/shared/services/notification.service';
import { CustomValidators } from 'ngx-custom-validators';
import { PasswordValidator } from '@app/shared/validators/match-password.validator';
import { ConfirmDialog } from '@app/layout/confirm-dialog/confirm-dialog.component';
import { Observable, throwError, Subject } from 'rxjs';
import { scaleAnimation } from '@app/animations/scale.animation';
import { User } from '@app/models/user';
import { UploadProfileImageDialog } from '@app/profile/upload-profile-image-dialog/upload-profile-image-dialog.component';
import { map, tap, catchError, takeUntil } from 'rxjs/operators';
import { merge } from 'lodash';
import { I18nService } from '@app/shared/services/i18n.service';
import { GeocodingService } from '@app/shared/services/geocoding.service';
import { UserManagerService } from '@app/shared/services/user-manager.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    animations: [scaleAnimation],
})
export class ProfileComponent implements OnInit {
    private _changed: boolean = false;
    private _saved: boolean = false;

    destroy = new Subject<any>();
    
    address$: Observable<any>;
    hide: boolean = true;
    image: File = null;
    profileForm: FormGroup;
    showFields: boolean = false;
    user: User;
    user$: Observable<User>;
    locale: string ;
    id:string= '';

    constructor(
        private _core: CoreService,
        private _dialog: MatDialog,
        private _fb: FormBuilder,
        private _fmSVC: FileManagerService,
        private _geo: GeocodingService,
        private _userSVC: UserManagerService,
        private _ntf: NotificationService,
        private _auth: AuthService,
        private _route: ActivatedRoute,
        private i18nService: I18nService
    ) {
        this.createForm();

        this.id = this._route.snapshot.params['id'];

        if(this.id && this.id!='') {            
            this.user$ = this._userSVC.read(this.id);

        }else{
            this.id = "";
            this.user$ = this._auth.user.pipe(
                tap((user: User) => {
                    if (!user) return;
                    this.profileForm.patchValue(user);
                    this.user = user;
                    this._changed = false;
                    this._saved = false;
                    this.address$ =this._geo.geocode(user.lastSignInLocation);
                }),
                catchError(err => err.code === 404
                    ? throwError("Not found")
                    : throwError(err)
                )
            );
        }

        this.profileForm.valueChanges
            .pipe(takeUntil(this.destroy))
            .subscribe(val => {
                this._changed = true;
            });
    }

    ngOnInit(): void {
        this.locale = this.i18nService.language;        

        this._fmSVC.downloadURL
            .pipe(takeUntil(this.destroy))
            .subscribe(url => {
                this.profileForm.controls['photoURL'].setValue(url);
            });
    }

    private createForm() {
        this.profileForm = this._fb.group({
            displayName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
            photoURL: ['', [CustomValidators.url]],
            password: ['', Validators.minLength(3)],
            password_confirm: ['', Validators.minLength(3)]
        }, {
                validator: PasswordValidator.MatchPassword
            });
    }

    private opendDiscardDlg(): Observable<boolean> {
        let dialogRef = this._dialog.open(ConfirmDialog, {
            data: { answer: false, title: 'dialog.discard_changes' }
        });

        return dialogRef.afterClosed().pipe(map(result => {
            if (!result) return false;
            return result.answer;
        }));
    }

    private uploadAvatar(file) {
        const path = `uploads/avatar/${this.user.uid}_${new Date().getTime()}`;

        this._fmSVC.upload(file, path);
        this._fmSVC.snapshot
            .pipe(takeUntil(this.destroy))
            .subscribe(_ => {
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

    updateProfile() {
        const inputValue = this.profileForm.value;

        let data = merge({}, this.user, inputValue);

        this._userSVC.update(data).then(_ =>this._ntf.open('toast.profile', 'toast.close'))
        this._saved = true;
    }

    openUploadAvatarDlg(): void {
        let dialogRef = this._dialog.open(UploadProfileImageDialog, {
            panelClass: 'custom-dialog',
            data: { file: this.image }
        });

        dialogRef.afterClosed()
            .pipe(takeUntil(this.destroy))
            .subscribe(result => {
                if (result && result.file)
                    this.uploadAvatar(result.file);
            });
    }

    deleteProfileImg($event: Event, url: string) {
        $event.preventDefault();
        if (url.search("https://firebasestorage.googleapis.com")) {
            this.profileForm.controls['photoURL'].setValue("");
            return;
        }

        url = decodeURIComponent(url);
        const parts = url.split("?")[0].split("/");
        const fileName = parts[parts.length - 1];
        const path = "uploads/avatar";

        this._fmSVC.delete(fileName, path)
            .then(_ => {
                this.profileForm.controls['photoURL'].setValue("");
            })
            .catch(err => {
                this._ntf.open('toast.firebase.' + err.code_, 'toast.close');
            });
    }

    ngOnDestroy(): void {
		this.destroy.next();
	}
}
