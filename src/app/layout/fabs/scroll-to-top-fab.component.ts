import { Component, Input } from "@angular/core";
import { slideUp } from "@app/animations/scale.animation";
import { CoreService } from "@app/shared";
import { distinctUntilChanged, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
    selector: "fab-scroll-to-top",
    templateUrl: "./scroll-to-top-fab.component.html",
    

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
    $scrollDirection: Observable<boolean>;

    @Input() htmlElement;
    scrollDirection: boolean;

    constructor(public core: CoreService) {
        this.core.isScrolling.pipe(
            distinctUntilChanged(),
            tap(dir =>{
                console.log('dir: ',dir);
            })
        ).subscribe(dir =>{
            this.scrollDirection = dir
        })
    }

    scrollToTop() {
        this.htmlElement.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
}
