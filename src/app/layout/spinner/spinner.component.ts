import { Component } from '@angular/core';
import { CoreService } from '@app/core';

@Component({
    selector: 'app-spinner',
    template: `
        <div *ngIf="core.isLoading|async" class="spinner" fxLayout="row" fxLayoutAlign="center center" fxFlexFill>
            <mat-spinner [strokeWidth]="3" [diameter]="50"></mat-spinner>
        </div>
        `,
    styles: [`
    .spinner{
        background-color: rgba(255,255,255,0.9) !important;
        transition: all 0.4s linear !important;
    }
    `]
})
export class SpinnerComponent {

    constructor(public core: CoreService) { }

}
