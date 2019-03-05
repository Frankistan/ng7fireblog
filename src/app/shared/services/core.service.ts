import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subject, zip, merge } from "rxjs";
import { map, filter, tap, takeUntil } from "rxjs/operators";
import {
    Router,
    ActivatedRoute,
    RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from "@angular/router";

@Injectable()
export class CoreService {
    private _postId$: BehaviorSubject<string> = new BehaviorSubject("");
    postId: Observable<string> = this._postId$.asObservable();
    private _window: Element;

    destroy = new Subject<any>();

    // currentPath: BehaviorSubject<string> = new BehaviorSubject("");
    darkTheme: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isListView: BehaviorSubject<boolean> = new BehaviorSubject(true);
    isScrolling: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isSearching: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isSearchOpened: BehaviorSubject<boolean> = new BehaviorSubject(false);
    language: BehaviorSubject<string> = new BehaviorSubject("es");

    constructor(private _rtr: Router) {
        // this.showLoader();
        let show$ = this._rtr.events.pipe(
            filter(event => event instanceof NavigationStart),
            map(event => true)
        );

        let hide$ = this._rtr.events.pipe(
            filter(
                event =>
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel ||
                    event instanceof NavigationError
            ),
            map(event => false)
        );

        merge(show$, hide$)
            .pipe(takeUntil(this.destroy))
            .subscribe(visibility => this.isLoading.next(visibility));
    }

    private showLoader() {
        this._rtr.events
            .pipe(
                tap((event: RouterEvent) => {
                    if (event instanceof NavigationStart) {
                        this.isLoading.next(true);
                    } else if (
                        event instanceof NavigationEnd ||
                        event instanceof NavigationCancel ||
                        event instanceof NavigationError
                    ) {
                        this.isLoading.next(false);
                    }
                }),
                takeUntil(this.destroy)
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
