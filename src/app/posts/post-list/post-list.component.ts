import { Component, OnInit } from "@angular/core";
import { ScrollTrackerEventData } from "@nicky-lenaers/ngx-scroll-tracker";
import { CoreService, PaginationService } from "@app/core";
import { Observable } from "rxjs";

@Component({
    selector: "app-post-list",
    templateUrl: "./post-list.component.html",
    styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {

    scrollPosition: number = 0;
    scrollableElement = null;
    data$: Observable<any>;

    constructor(
        public core: CoreService,
        public page: PaginationService,
    ) {}

    ngOnInit() {
        this.page.reset();
        this.page.init("posts", "created_at", { reverse: true });
    }

    scrollListener(eventData: ScrollTrackerEventData) {
        const el = eventData.elementRef.nativeElement;
        const top = eventData.$event.srcElement
            ? eventData.$event.srcElement.scrollTop
            : 0;
        const cheight = eventData.$event.srcElement
            ? eventData.$event.srcElement.clientHeight
            : 0;
        const height = el.scrollHeight;
        const offSet = 144;

        let scroll = eventData.$event.srcElement
            ? eventData.$event.srcElement.scrollTop
            : 0;

        if (scroll > this.scrollPosition) {
            if (this.scrollPosition > offSet)
                this.core.isScrolling.next("down");
        } else {
            this.core.isScrolling.next("up");
            if (eventData.$event.srcElement) {
                this.scrollableElement = eventData.$event.srcElement;
            }
        }

        this.scrollPosition = scroll;

        if (scroll + cheight > height - offSet) {
            this.page.more();
        }

        if (top === 0) this.core.isScrolling.next("down");
    }
}