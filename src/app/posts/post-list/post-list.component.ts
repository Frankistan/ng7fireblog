import { Component, ViewChild } from "@angular/core";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap, scan, mergeMap, throttleTime } from "rxjs/operators";

@Component({
    selector: "app-post-list",
    templateUrl: "./post-list.component.html",
    styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent {
    @ViewChild(CdkVirtualScrollViewport)
    viewport: CdkVirtualScrollViewport;

    batch = 20;
    theEnd = false;

    offset = new BehaviorSubject(null);
    infinite: Observable<any[]>;

    constructor(private db: AngularFirestore) {
        const batchMap = this.offset.pipe(
            throttleTime(500),
            mergeMap(n => this.getBatch(n)),
            scan((acc, batch) => {
                return { ...acc, ...batch };
            }, {})
        );

        this.infinite = batchMap.pipe(map(v => Object.values(v)));
    }

    getBatch(offset) {
        console.log(offset);
        return this.db
            .collection("posts", ref =>
                ref
                .orderBy('title', 'asc')
                .orderBy('created_at', 'desc')
                    .startAfter(offset)
                    .limit(this.batch)
            )
            .snapshotChanges()
            .pipe(
                tap(arr => (arr.length ? null : (this.theEnd = true))),
                map(arr => {
                    return arr.reduce((acc, cur) => {
                        const id = cur.payload.doc.id;
                        const data = cur.payload.doc.data();
                        return { ...acc, [id]: data };
                    }, {});
                })
            );
    }

    nextBatch(e, offset) {
        if (this.theEnd) {
            return;
        }

        const end = this.viewport.getRenderedRange().end;
        const total = this.viewport.getDataLength();
        console.log(`${end}, '>=', ${total}`);
        if (end === total) {
            this.offset.next(offset);
        }
    }

    trackByIdx(i) {
        return i;
    }
}
