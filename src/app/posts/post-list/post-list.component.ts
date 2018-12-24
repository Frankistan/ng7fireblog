import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ScrollTrackerEventData } from "@nicky-lenaers/ngx-scroll-tracker";
import { CoreService, PaginationService } from "@app/shared";
import { Observable } from "rxjs";
import { ScrollDispatcher, CdkScrollable } from "@angular/cdk/scrolling";
import { distinctUntilChanged, tap } from "rxjs/operators";

@Component({
    selector: "app-post-list",
    templateUrl: "./post-list.component.html",
    styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, AfterViewInit {
    scrollPosition: number = 0;
    scrollableElement = null;
    data$: Observable<any>;
    scrollingSubscription: any;
    lastOffset: number;
    
    constructor(
        public core: CoreService,
        public page: PaginationService,
        public scroll: ScrollDispatcher
    ) {

        
    }

    ngOnInit() {
        this.page.reset();
        this.page.init("posts", "created_at", { reverse: true });
    }

    private onWindowScroll(data: CdkScrollable) {
        const el = data.getElementRef().nativeElement;
        
        const top = el.scrollTop;
        const cheight = el.clientHeight;
        const height = el.scrollHeight;
        const offSet = 1;

        if (top > this.scrollPosition) {
            if (this.scrollPosition > offSet)
                this.core.isScrolling.next(false);
        } else {
            this.core.isScrolling.next(true);
            if (el) {
                this.scrollableElement = el;
            }
        }

        this.scrollPosition = top;

        if (top + cheight > height - offSet) {
            this.page.more();
        }

        if (top === 0) this.core.isScrolling.next(false);
    }

   

    ngAfterViewInit() {
        this.scrollingSubscription = this.scroll
            .scrolled()
            .subscribe((data: CdkScrollable) => {
                this.onWindowScroll(data);
            });

           
    }
}
