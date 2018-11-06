import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable, BehaviorSubject, empty, Subject } from 'rxjs';
import { map, filter, flatMap, tap, takeUntil } from 'rxjs/operators';
import {
    Router,
    ActivatedRoute,
    RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError,
} from '@angular/router'

@Injectable()
export class CoreService {
    private _postId$: BehaviorSubject<string> = new BehaviorSubject('');
    postId:Observable<string>= this._postId$.asObservable();
    private _window: Element;

    destroy = new Subject<any>();

    currentPath: BehaviorSubject<string> = new BehaviorSubject("");
    darkTheme: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isListView: BehaviorSubject<boolean> = new BehaviorSubject(true);
    isScrolling: BehaviorSubject<string> = new BehaviorSubject("up");
    isSearching: BehaviorSubject<boolean> = new BehaviorSubject(false);
    language: BehaviorSubject<string> = new BehaviorSubject('es');
    title: BehaviorSubject<string> = new BehaviorSubject("");
    titleTranslationKey: string = "title.app";

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _titleSVC: Title,
        private _translateSVC: TranslateService,
    ) {
        this._translateSVC.onLangChange
            .pipe(takeUntil(this.destroy))
            .subscribe((event: LangChangeEvent) => {
                this.language.next(event.lang);
                this._translateSVC.get(this.titleTranslationKey).subscribe((res: string) => {
                    this._titleSVC.setTitle(res);
                });
        });

        this.language
            .pipe(
                flatMap(lang => {
                    return this._translateSVC.use(lang || "es")
                }),
                takeUntil(this.destroy)
            )
            .subscribe();

        this.changeTitle();
    }

    private changeTitle() {
        // CHANGE TITLE ON ROUTE CHANGES
        // Dynamic page titles in Angular 2 with router events
        // FUENTE: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
        this._router.events
            .pipe(
                tap((event:RouterEvent)=>{
                    if (event instanceof NavigationStart) {
                        this.isLoading.next(true);
                    }
                    else if (
                        event instanceof NavigationEnd ||
                        event instanceof NavigationCancel ||
                        event instanceof NavigationError
                    ) {
                        const contentContainer = document.querySelector('.content') || this._window;
                        contentContainer.scrollTo(0, 0);
                        this.isLoading.next(false);
                    }
                }),
                filter((event) => event instanceof NavigationEnd),
                map(() => this._route),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                takeUntil(this.destroy)
                )
            .subscribe((event: ActivatedRoute) => {
                const id = event.snapshot.params['id'];
                this._postId$.next(id);

                let key: any = 'title.' + event.snapshot.data.title;
                let path: any = event.snapshot.routeConfig.path;

                this.title.next(key);

                // if (path !== "posts" || path !== "favorites") this.isSearching.next(false);
                this.isSearching.next(false);

                this.currentPath.next(path);

                this._translateSVC.get(key).subscribe((res: string) => {
                    this.titleTranslationKey = key;

                    this._titleSVC.setTitle(res);
                });
            });
    }

    private errorHandler(error: any) {
        console.log('error: ', error);
        // this._ntf.open('toast.firebase.' + error.message, 'toast.close');
        return empty();
    }

    ngOnDestroy(): void {
		this.destroy.next();
	}
}
