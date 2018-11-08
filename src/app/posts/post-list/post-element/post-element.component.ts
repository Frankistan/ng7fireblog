import { Component, OnInit, Input } from "@angular/core";
import { CoreService } from "@app/core";

@Component({
    selector: "app-post-element",
    templateUrl: "./post-element.component.html",
    styleUrls: ["./post-element.component.css"]
})
export class PostElementComponent implements OnInit {
    @Input() post;
    @Input() index;

    constructor(public core: CoreService) {}

    ngOnInit() {}
}
