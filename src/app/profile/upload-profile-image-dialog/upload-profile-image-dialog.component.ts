import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-upload-profile-image-dialog',
    templateUrl: './upload-profile-image-dialog.component.html',
    styleUrls: ['./upload-profile-image-dialog.component.css']
})
export class UploadProfileImageDialog implements OnInit {
    imageChangedEvent: any = '';
    croppedImage: any = '';
    file: File = null;

    aspectRatio: number = 1/1;
    resizeToWidth: number = 256;

    constructor(
        private dialogRef: MatDialogRef<UploadProfileImageDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }



    fileChangeEvent($event): void {
        this.imageChangedEvent = $event;
        this.file = $event.target.files[0];
    }
    imageCropped(image: string) {
        this.croppedImage = image;
        var that = this;
        this.urltoFile(this.croppedImage, this.file.name, 'image/jpeg')
            .then(function (file) {
                if (file) {
                    that.data.file = file;
                }
            });
    }

    imageLoaded() {
        // show cropper
    }

    loadImageFailed() {
        // show message
    }

    //return a promise that resolves with a File instance
    // FUENTE: https://stackoverflow.com/questions/16968945/convert-base64-png-data-to-javascript-file-objects
    private urltoFile(url, filename, mimeType) {
        mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
        return (fetch(url)
            .then((res) => { return res.arrayBuffer(); })
            .then((buf) => { return new File([buf], filename, { type: mimeType }); })
        );
    }

}
