import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers/app.reducer';
import { environment } from '@env/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
	StoreModule.forRoot(reducers, { metaReducers }),
	// Following import tell the application not to work with the store-devtools if in production
    !environment.production ? StoreDevtoolsModule.instrument({
		maxAge: 25, // Retains last 25 states
		logOnly: environment.production, // Restrict extension to log-only mode
	}) : [] 
  ]
})
export class AppStoreModule { }
