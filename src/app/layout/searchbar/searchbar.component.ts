import { Component, OnInit, OnDestroy } from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl
} from "@angular/forms";
import { CoreService, PaginationService } from "@app/shared";
import {
    map,
    distinctUntilChanged,
    debounceTime,
    takeUntil
} from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: "app-searchbar",
    templateUrl: "./searchbar.component.html",
    styleUrls: ["./searchbar.component.css"]
})
export class SearchbarComponent implements OnInit, OnDestroy {
    searchForm: FormGroup;
    searchInput: AbstractControl;
    destroy = new Subject<any>();

    constructor(
        private _core: CoreService,
        private _fb: FormBuilder,
        private _page: PaginationService,
        private _router: Router
    ) {
        this.createForm();
    }

    private createForm() {
        this.searchForm = this._fb.group({
            searchInput: ["", Validators.minLength(3)]
        });

        this.searchInput = this.searchForm.get("searchInput");
    }

    ngOnInit() {
        this.searchInput.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                map((term: string) => {
                    term = term.trim().toUpperCase();

                    if (term.length < 3) return;

                    this._page.reset();
                    this._page.init("posts", "created_at", {
                        search: term,
                        reverse: true
                    });
                }),
                takeUntil(this.destroy)
            )
            .subscribe();
    }

    close() {
        this._page.reset();
        this._page.init("posts", "created_at", {
            reverse: true
        });
        this._router.navigate(["/posts"]);

        this._core.isSearching.next(false);
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
