import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NotificationService, PostsService, PaginationService, CoreService } from '@app/core';
import { ConfirmDialog } from '@app/layout/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'btn-more',
    templateUrl: './btn-more.component.html',
    styleUrls: ['./btn-more.component.css']
})
export class BtnMoreComponent implements OnDestroy {
    @Input() path: string;
    @Input() id: string;
    reverse: boolean = true;
    field: string = "created_at";

    listView: boolean = true;
    destroy = new Subject<any>();

    constructor(
        private _paginatorSVC: PaginationService,
        private _postSVC: PostsService,
        private _ntf: NotificationService,
        private _router: Router,
        private _dlg: MatDialog,
        private _core: CoreService,
    ) { }

    orderBy(field: string) {
        this.field = field;
        this.reverse = !this.reverse;
        this._paginatorSVC.reset();
        this._paginatorSVC.init('posts', this.field, {
            reverse: this.reverse
        });
    }

    openDeleteDlg() {
        let dialogRef = this._dlg.open(ConfirmDialog, {
            data: { answer: false ,title: 'dialog.delete_post' }
        });

        dialogRef.afterClosed().pipe(
            map(result => {
                if (!result) return false;
                return result.answer;
            }),
            takeUntil(this.destroy))
            .subscribe(res => {if(res) this.deletePost()} );

    }

    deletePost() {
        this._core.isLoading.next(true);
        this._postSVC.delete(this.id)
            .pipe(takeUntil(this.destroy))
            .subscribe(_ => {
            this._core.isLoading.next(false);
            this._ntf.open('toast.post.deleted', 'toast.close');
            this._router.navigate(['/posts']);
        });
    }

    changeView(mode:boolean){
        this.listView = !!mode;
        this._core.isListView.next(this.listView);
    }

    ngOnDestroy(): void {
		this.destroy.next();
	}
}
