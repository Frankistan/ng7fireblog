import { Component, OnInit, Input } from "@angular/core";
import { ObservableMedia, MediaChange } from "@angular/flex-layout";
import { Store } from "@ngrx/store";
import { AppState } from "@app/store/reducers/app.reducer";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app-grid-view",
    templateUrl: "./grid-view.component.html",
    styleUrls: ["./grid-view.component.css"]
})
export class GridViewComponent implements OnInit{
    @Input() data$: Observable<any>;

    rowHeight: string = "240px";
    destroy = new Subject<any>();
	cols$: Observable<number>;
	mode$: Observable<boolean>;

    constructor(
		public media: ObservableMedia, 
		private store: Store<AppState>
		) {

        // Option 1: The Vanilla way
        let w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName("body")[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth;
        // y = w.innerHeight || e.clientHeight || g.clientHeight;
        let cols = 0;
        switch (true) {
            case x < 599:
                cols = 1; // 'screen and (max-width: 599px)'
                break;
            case x < 959:
                cols = 2; // 'screen and (min-width: 600px) and (max-width: 959px)'
                break;
            case x < 1279:
                cols = 3; // 'screen and (min-width: 960px) and (max-width: 1279px)'
                break;
            case x < 1919:
                cols = 3; // 'screen and (min-width: 1280px) and (max-width: 1919px)'
                break;
            default: cols = 3; 
            break;
        }

        // Option 2: The Angular way
        // https://youtu.be/w9InzT-SdIE?t=6m20s
        this.cols$ = this.media.asObservable()
        .pipe(
            map((change: MediaChange) => {
                let cols = 0;
                switch (change.mqAlias) {
                    case "xs":
                        cols = 2; // 'screen and (max-width: 599px)'
                        break;
                    case "sm":
                        cols = 3; // 'screen and (min-width: 600px) and (max-width: 959px)'
                        break;
                    case "md":
                        cols = 3; // 'screen and (min-width: 960px) and (max-width: 1279px)'
                        break;
                    case "lg":
                        cols = 4; // 'screen and (min-width: 1280px) and (max-width: 1919px)'
                        break;
                }
                return cols;
            }));
	}
	
	ngOnInit() {
		this.mode$ = this.store.select('layout').pipe(
			map( state => state.isListView)
		);
	}
}
