import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
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

    currentPath: BehaviorSubject<string> = new BehaviorSubject("");
    darkTheme: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isListView: BehaviorSubject<boolean> = new BehaviorSubject(true);
    isScrolling: BehaviorSubject<boolean> = new BehaviorSubject(true);
    isSearching: BehaviorSubject<boolean> = new BehaviorSubject(false);
    language: BehaviorSubject<string> = new BehaviorSubject("es");

    constructor(private _route: ActivatedRoute, private _router: Router) {
        this.changeTitle();
    }

    private changeTitle() {
        // CHANGE TITLE ON ROUTE CHANGES
        // Dynamic page titles in Angular 2 with router events
        // FUENTE: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
        this._router.events
            .pipe(
                tap((event: RouterEvent) => {
                    if (event instanceof NavigationStart) {
                        this.isLoading.next(true);
                    } else if (
                        event instanceof NavigationEnd ||
                        event instanceof NavigationCancel ||
                        event instanceof NavigationError
                    ) {
                        const contentContainer =
                            document.querySelector(".content") || this._window;
                        contentContainer.scrollTo(0, 0);
                        this.isLoading.next(false);
                    }
                }),
                filter(event => event instanceof NavigationEnd),
                map(() => this._route),
                map(route => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter(route => route.outlet === "primary"),
                takeUntil(this.destroy)
            )
            .subscribe((event: ActivatedRoute) => {
                const id = event.snapshot.params["id"];
                let path: any = event.snapshot.routeConfig.path;
                this._postId$.next(id);
                this.isSearching.next(false);
                this.currentPath.next(path);
            });
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
