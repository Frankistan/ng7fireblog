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
import { SetPostsFilters } from "@app/store/actions/post.actions";
import { Store } from "@ngrx/store";
import { State } from "@app/store/reducers/post.reducer";

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
		private core: CoreService,
		private store: Store<State>
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
		this.core.isSearchOpened
			.pipe(
				takeUntil(this.destroy)
			)
			.subscribe(s => {
				if (!s) this._rtr.navigate([{ outlets: { search: null } }]);
			});

		this.searchInput.valueChanges
			.pipe(
				debounceTime(400),
				distinctUntilChanged(),
				map((term: string) => {
					this.core.isSearching.next(true);
					term = term.trim().toUpperCase();

					if (term.length < 3) return;

					this.store.dispatch(new SetPostsFilters({
						collection: "posts",
						orderBy: "created_at",
						opts: {
							search: term,
							reverse: true
						}
					}));
				}),
				takeUntil(this.destroy)
			)
			.subscribe();
	}

	clear() {
		this.searchForm.controls['searchInput'].setValue('');
	}

	close() {
		if (
			this.searchForm.valid &&
			this.searchForm.dirty &&
			this.searchForm.touched
		) {
			this.store.dispatch(new SetPostsFilters({
				collection: "posts",
				orderBy: "created_at",
				opts: {
					reverse: true
				}
			}));

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
