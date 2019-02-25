import { Component, ViewChild, AfterContentChecked } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { CoreService, PaginationService } from "@app/shared";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app-virtual-infinity-scroll",
    templateUrl: "./virtual-infinity-scroll.component.html",
    styleUrls: ["./virtual-infinity-scroll.component.scss"]
})
export class VirtualInfinityScrollComponent implements AfterContentChecked {
    @ViewChild(CdkVirtualScrollViewport)
    viewport: CdkVirtualScrollViewport;

    virtualViewport: CdkVirtualScrollViewport = null;

    isMobile$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.XSmall)
        .pipe(map(result => result.matches));

    theEnd = false;

    constructor(
        public core: CoreService,
        public page: PaginationService,
        private breakpointObserver: BreakpointObserver
    ) {
        this.page.reset();
        this.page.init("posts", "created_at", {
            reverse: true
        });
    }

    nextBatch() {
        if (this.theEnd) {
            return;
        }

        const end = this.viewport.getRenderedRange().end;
        const total = this.viewport.getDataLength();

        // console.log(`${end}, '>=', ${total}`);

        if (end === total) {
            this.page.more();
        }
    }

    trackByIdx(i) {
        return i;
    }

    ngAfterContentChecked(): void {
        //Called after every check of the component's or directive's content.
        //Add 'implements AfterContentChecked' to the class.
        this.virtualViewport = this.viewport;
    }
}
