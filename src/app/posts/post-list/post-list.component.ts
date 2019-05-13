import { Component, OnInit } from "@angular/core";
import { ScrollTrackerEventData } from "@nicky-lenaers/ngx-scroll-tracker";
import { CoreService, PaginationService } from "@app/shared";
import { Subject, Observable } from "rxjs";
import { State } from "@app/store/reducers/post.reducer";
import { Store } from "@ngrx/store";
import { Post } from "@app/models/post";
import { map } from "rxjs/operators";
import { SetPosts } from "@app/store/actions/post.actions";

@Component({
	selector: "app-post-list",
	templateUrl: "./post-list.component.html",
	styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
	scrollPosition: number;
	scrollableElement: Element;
	destroy = new Subject<any>();
	posts$: Observable<Post[]>;

	constructor(
		public core: CoreService,
		public page: PaginationService,
		private store: Store<State>
	) { }

	ngOnInit() {
		this.page.reset();
		this.page.init("posts", "created_at", {
			reverse: true
		});

		this.store.dispatch( new SetPosts());
		
		this.posts$ = this.store.select('posts').pipe(
			map(state => state.posts)
		);

	}

	scrollListener(eventData: ScrollTrackerEventData) {
		const nEl = eventData.elementRef.nativeElement;
		const sEl = eventData.$event.srcElement;
		const top = sEl ? sEl.scrollTop : 0;
		const cheight = sEl ? sEl.clientHeight : 0;
		const height = nEl.scrollHeight;
		const offSet = 144;

		let scroll = sEl ? sEl.scrollTop : 0;

		if (scroll > this.scrollPosition) {
			this.core.isScrolling.next(false);
		} else {
			this.core.isScrolling.next(true);
			if (sEl) {
				this.scrollableElement = sEl;
			}
		}

		this.scrollPosition = scroll;

		if (scroll + cheight > height - offSet) {
			this.page.more();
		}

		if (top === 0) this.core.isScrolling.next(false);
	}
}
