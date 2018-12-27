import { Component, OnInit } from "@angular/core";
import { ScrollTrackerEventData } from "@nicky-lenaers/ngx-scroll-tracker";
import { CoreService, PaginationService } from "@app/shared";

@Component({
    selector: "app-post-list",
    templateUrl: "./post-list.component.html",
    styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
    scrollPosition: number;
    scrollableElement: Element;

    constructor(public core: CoreService, public page: PaginationService) {}

    ngOnInit() {
        this.page.reset();
        this.page.init("posts", "created_at", { reverse: true });
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
