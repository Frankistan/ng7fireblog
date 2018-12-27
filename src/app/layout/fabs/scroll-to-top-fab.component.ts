import { Component, Input } from "@angular/core";
import { slideUp } from "@app/animations/scale.animation";
import { CoreService } from "@app/shared";
import { distinctUntilChanged, } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
    selector: "fab-scroll-to-top",
    template: `
        <button
            [@slideUp]
            *ngIf="($scrollDirection | async) == true"
            mat-fab
            class="mat-fab-bottom-right"
            (click)="scrollToTop()"
        >
            <mat-icon aria-label="scroll to top">arrow_upward</mat-icon>
        </button>
    `,
    styles: [
        `
            .mat-fab-bottom-right {
                top: auto !important;
                right: 1.5rem !important;
                bottom: 1.5rem !important;
                left: auto !important;
                position: fixed !important;
            }
        `
    ],
    animations: [slideUp]
})
export class FabScrollToTopComponent {
    @Input() htmlElement:Element;
    $scrollDirection: Observable<boolean>;

    constructor(public core: CoreService) {
        this.$scrollDirection = this.core.isScrolling.pipe(
            distinctUntilChanged()
        );
    }

    scrollToTop() {
        this.htmlElement.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
}
