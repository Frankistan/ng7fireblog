import { NgModule } from "@angular/core";
import { environment } from "@env/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";

@NgModule({
    imports: [AngularFireModule.initializeApp(environment.firebase)],
    exports: [
        AngularFireModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule
    ]
})
export class CustomFirebaseModule {}
