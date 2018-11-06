import { Component } from '@angular/core';
import { CoreService, PaginationService } from '@app/core';

@Component({
    selector: 'app-post-empty',
    templateUrl: './post-empty.component.html',
    styleUrls: ['./post-empty.component.css']
})
export class PostEmptyComponent {

    constructor(
        public core: CoreService,
        public page: PaginationService
    ) { }

}
