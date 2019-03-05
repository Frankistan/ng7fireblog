import { Component, OnInit, OnDestroy } from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl
} from "@angular/forms";
import { PaginationService, CoreService } from "@app/shared";
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
        private _fb: FormBuilder,
        private _page: PaginationService,
        private _rtr: Router,
        private core: CoreService
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
                    this.core.isSearching.next(true);
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

    clear(){
        this.searchForm.controls['searchInput'].setValue('');
    }

    close() {
        if (
            this.searchForm.valid &&
            this.searchForm.dirty &&
            this.searchForm.touched
        ) {
            this._page.reset();
            this._page.init("posts", "created_at", {
                reverse: true
            });
            this.core.isSearching.next(true);
        }
        this.core.isSearching.next(false);
        this.core.isSearchOpened.next(false);        

        this._rtr.navigate([{ outlets: { search: null } }]);
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
