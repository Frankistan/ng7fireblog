import { Component, OnInit, OnDestroy } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import { CoreService, PaginationService } from "@app/shared";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import moment from "moment";
import {
    FormArray,
    FormGroup,
    FormBuilder,
    FormControl,
    ValidatorFn
} from "@angular/forms";
// import { minDate } from "ngx-custom-validators/src/app/min-date/validator";
// import { maxDate } from "ngx-custom-validators/src/app/max-date/validator";

@Component({
    selector: "app-filters",
    templateUrl: "./filters.component.html",
    styleUrls: ["./filters.component.css"]
})
export class FiltersComponent implements OnInit, OnDestroy {
    minDate = new FormControl(moment([2014, 1, 3]));
    maxDate = new FormControl(moment(new Date()));

    minimum = moment([2014, 1, 3]);
    maximum = moment(new Date());

    destroy = new Subject<any>();

    myFilter = (d: any): boolean => {
        const day = d.day();
        // Prevent Saturday and Sunday from being selected.
        return day !== 0 && day !== 6;
    };

    filtersForm: FormGroup;

    authors = [
        {
            uid: "3rVqxwGyjWZH9yAWTslXf47K1Fv1",
            displayName: "Iban Salgado",
            selected: true
        },
        {
            uid: "D0G8KfvW7gXqjUS4JpsxaFY4so93",
            displayName: "Úrsula Seijas",
            selected: true
        },
        {
            uid: "USpQ4GwiRNN1gPoUl5FEvMCttHw2",
            displayName: "Estefanía C.",
            selected: true
        },
        {
            uid: "tXWXpHeP3pOf1eyiIqThueRjmqz1",
            displayName: "Alicia Aragón",
            selected: true
        },
        {
            uid: "Sa0LN1o1v0U5v1NW9Tye1kJMowa2",
            displayName: "Aníbal Báez",
            selected: true
        }
    ];

    constructor(
        private fb: FormBuilder,
        private adapter: DateAdapter<any>,
        private core: CoreService,
        private page: PaginationService
    ) {
        this.createFiltersForm();
    }

    ngOnInit() {
        this.core.language.pipe(takeUntil(this.destroy)).subscribe(lang => {
            this.adapter.setLocale(lang || "es");
        });
    }

    private createFiltersForm() {
        this.filtersForm = this.fb.group({
            authors: this.setAuthors(),
            minDate: this.minDate,
            maxDate: this.maxDate
        });
    }

    private setAuthors() {
        const controls = this.authors.map(c => new FormControl(false));
        controls[0].setValue(true); // Set the first checkbox to true (checked)
        return this.fb.array(controls, this.minSelectedCheckboxes(1));
    }

    onSubmit() {
        const checkboxes = this.filtersForm.value.authors
            .map((v, i) => (v ? this.authors[i].uid : null))
            .filter(v => v !== null);

        console.log("checkboxes: ", checkboxes);
        // var d = moment(s, "DD MMM YYYY, HH:mm", true).format();
        var t = new Date(this.filtersForm.value.minDate).getTime();
        console.log("min date  : ", t);

        this.page.reset();
        this.page.init("posts", "created_at", {
            filter: {
                date: {
                    min: this.filtersForm.value.minDate,
                    max: this.filtersForm.value.maxDate
                },
                author: "Sa0LN1o1v0U5v1NW9Tye1kJMowa2"
            },
            reverse: true
        });

        // this.page.reset();
        // this.page.init("posts", "created_at", {
        //     filter: {
        //         date: {
        //             min: moment([2014, 1, 3]).format(),
        //             max: moment(new Date()).toString()
        //         },
        //         author: "Sa0LN1o1v0U5v1NW9Tye1kJMowa2"
        //     },
        //     reverse: true
        // });
    }

    get authorControl(): FormArray {
        return this.filtersForm.get("authors") as FormArray;
    }

    private minSelectedCheckboxes(min = 1) {
        const validator: ValidatorFn = (formArray: FormArray) => {
            const totalSelected = formArray.controls
                // get a list of checkbox values (boolean)
                .map(control => control.value)
                // total up the number of checked checkboxes
                .reduce((prev, next) => (next ? prev + next : prev), 0);

            // if the total is not greater than the minimum, return the error message
            return totalSelected >= min
                ? null
                : {
                      required: true
                  };
        };

        return validator;
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
