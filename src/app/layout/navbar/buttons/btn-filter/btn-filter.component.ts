import { Component, Input } from '@angular/core';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { CoreService } from '@app/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'btn-filter',
    templateUrl: './btn-filter.component.html',
    styleUrls: ['./btn-filter.component.css']
})
export class BtnFilterComponent  {
    @Input('filterNavRef') filterNavRef: MatSidenav;

    destroy = new Subject<any>();

    constructor(
        public core: CoreService,
        private _router: Router
    ) {
        this._router.events
            .pipe(takeUntil(this.destroy))
            .subscribe((event: RouterEvent) => {
                if (event instanceof NavigationStart) {
                    this.filterNavRef.close();
                }
            });
    }

    ngOnDestroy(): void {
		this.destroy.next();
	}
}
