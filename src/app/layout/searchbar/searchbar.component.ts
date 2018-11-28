import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CoreService, PaginationService } from '@app/shared';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
    searchForm: FormGroup;
    searchInput: AbstractControl;

    // startAt: BehaviorSubject<string | null> = new BehaviorSubject('');

    constructor(
        private coreSrv: CoreService,
        private fb: FormBuilder,
        private PaginationService: PaginationService,
    ) {
        this.createForm();
    }

    private createForm() {
        this.searchForm = this.fb.group({
            searchInput: ['', Validators.minLength(3)]
        });

        this.searchInput = this.searchForm.get('searchInput');
    }

    ngOnInit() {

        this.searchInput.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            map((term: string) => {
                term = term.trim().toUpperCase();

                if (term.length < 3) return;

                this.PaginationService.reset();
                this.PaginationService.init('posts', 'created_at', {
                    filter: term,
                    reverse: true
                });
            })
        ).subscribe();
    }

    close() {

        if (this.searchForm.valid && this.searchForm.dirty && this.searchForm.touched) {
            this.PaginationService.reset();
            this.PaginationService.init('posts', 'created_at');
        }
        this.coreSrv.isSearching.next(false);
    }

}
