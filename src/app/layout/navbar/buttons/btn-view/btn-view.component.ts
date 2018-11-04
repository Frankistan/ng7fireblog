import { Component, OnInit } from '@angular/core';
import { CoreService } from '@app/core';

@Component({
    selector: 'btn-view',
    templateUrl: './btn-view.component.html',
    styleUrls: ['./btn-view.component.css']
})
export class BtnViewComponent implements OnInit {
    listView: boolean = false;

    constructor(
        public core: CoreService,
        // private _paginatorSVC: PaginationService
    ) { }

    ngOnInit() {
    }

    changeView(){
        this.listView = !this.listView;
    }

}
