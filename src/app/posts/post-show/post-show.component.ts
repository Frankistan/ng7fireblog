import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CoreService, PostsService, I18nService } from '@app/shared';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-post-show',
	templateUrl: './post-show.component.html',
	styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit,AfterViewInit {
	post$: Observable < {} > ;
	id: any;
	trustedContent: any;
	locale: string ;

	constructor(
		private _route: ActivatedRoute,
		private _postsSVC: PostsService,
		private _core: CoreService,
		public sanitizer: DomSanitizer,
		private _i18n: I18nService
	) {}

	ngOnInit() {
		this.locale = this._i18n.language;
		this._core.isLoading.next(true);
		this.id = this._route.snapshot.params['id'];
		this.post$ = this._postsSVC.read(this.id);
	}

	ngAfterViewInit() {
		this._core.isLoading.next(false);	
	}

}