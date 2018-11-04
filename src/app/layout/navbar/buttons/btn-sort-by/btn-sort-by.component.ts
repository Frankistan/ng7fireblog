import { Component } from '@angular/core';
import { CoreService, PaginationService } from '@app/core';

@Component({
    selector: 'btn-sort-by',
    templateUrl: './btn-sort-by.component.html',
    styleUrls: ['./btn-sort-by.component.css']
})
export class BtnSortByComponent  {
    reverse:boolean = true;
    field:string ="created_at";

    constructor(
        private _paginatorSVC: PaginationService,
        public core: CoreService
    ) { }

    orderBy(field: string) {
        this.field = field;
        this.reverse =!this.reverse;
        this._paginatorSVC.reset();
        this._paginatorSVC.init('posts', this.field, {
            reverse: this.reverse
        });
    }

}
