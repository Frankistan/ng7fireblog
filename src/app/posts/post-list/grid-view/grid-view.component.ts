import { Component, OnInit, Input } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ObservableMedia, MediaChange } from "@angular/flex-layout";
import { CoreService } from "@app/shared";

@Component({
    selector: "app-grid-view",
    templateUrl: "./grid-view.component.html",
    styleUrls: ["./grid-view.component.css"]
})
export class GridViewComponent {
    @Input() data$: Observable<any>;

    cols: number = 3;
    rowHeight: string = '240px';
    watcher: Subscription;

    constructor(
        public media: ObservableMedia,
        public core: CoreService
        ){
        let w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth;
            // y = w.innerHeight || e.clientHeight || g.clientHeight;

        switch (true) {
            case (x < 599): this.cols = 1; // 'screen and (max-width: 599px)'
                break;
            case (x < 959): this.cols = 2; // 'screen and (min-width: 600px) and (max-width: 959px)'
                break;
            case (x < 1279): this.cols = 3; // 'screen and (min-width: 960px) and (max-width: 1279px)'
                break;
            case (x < 1919): this.cols = 3; // 'screen and (min-width: 1280px) and (max-width: 1919px)'
                break;
        };
        // https://youtu.be/w9InzT-SdIE?t=6m20s
        this.watcher = media.asObservable().subscribe((change: MediaChange) => {

            switch (change.mqAlias) {
                case 'xs': this.cols = 1; // 'screen and (max-width: 599px)'
                    break;
                case 'sm': this.cols = 2; // 'screen and (min-width: 600px) and (max-width: 959px)'
                    break;
                case 'md': this.cols = 2; // 'screen and (min-width: 960px) and (max-width: 1279px)'
                    break;
                case 'lg': this.cols = 3; // 'screen and (min-width: 1280px) and (max-width: 1919px)'
                    break;
            }
        });
    }

}
