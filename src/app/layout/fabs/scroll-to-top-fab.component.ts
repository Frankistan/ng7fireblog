import { Component, Input } from '@angular/core';
import { slideUp } from '@app/animations/scale.animation';
import { CoreService } from '@app/core';

@Component({
    selector: 'fab-scroll-to-top',
    template: `
    <button [@slideUp] *ngIf="(core.isScrolling|async)=='up'"  mat-fab class="mat-fab-bottom-right" (click)="scrollToTop()">
        <mat-icon aria-label="scroll to top">arrow_upward</mat-icon>
    </button>
  `,
    styles: [`
        .mat-fab-bottom-right {
            top: auto !important;
            right: 1.5rem !important;
            bottom: 1.5rem !important;
            left: auto !important;
            position: fixed !important;
        }
    `],
    animations: [slideUp]
})
export class FabScrollToTopComponent {
    @Input() htmlElement;

    constructor(public core: CoreService) { }

    scrollToTop() {
        this.htmlElement.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

}
