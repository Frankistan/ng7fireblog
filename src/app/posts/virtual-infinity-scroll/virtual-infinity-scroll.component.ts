import { Component, ViewChild } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { CoreService, PaginationService } from "@app/shared";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "@app/models/post";

@Component({
    selector: "app-virtual-infinity-scroll",
    templateUrl: "./virtual-infinity-scroll.component.html",
    styleUrls: ["./virtual-infinity-scroll.component.scss"]
})
export class VirtualInfinityScrollComponent {
    @ViewChild(CdkVirtualScrollViewport)
    viewport: CdkVirtualScrollViewport;

    isMobile$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.XSmall)
        .pipe(map(result => result.matches));


    theEnd = false;

    offset = new BehaviorSubject(null);
    infinite: Observable<Post[]>;

    constructor(
        public core: CoreService,
        public page: PaginationService,
        private breakpointObserver: BreakpointObserver
    ) {
        this.page.reset();
        this.page.init("posts", "created_at", {
            reverse: true
        });

        this.breakpointObserver
        .observe(Breakpoints.XSmall)
        .pipe(map(result => result.matches)).subscribe( v=> console.log('matches: ',v) )
    }

    nextBatch(e, offset) {
        if (this.theEnd) {
            return;
        }

        const end = this.viewport.getRenderedRange().end;
        const total = this.viewport.getDataLength();

        console.log(`${end}, '>=', ${total}`);

        if (end === total) {
            this.page.more();
            this.offset.next(offset);
        }
    }

    trackByIdx(i) {
        return i;
    }
}
