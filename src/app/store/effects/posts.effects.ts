import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { SetPosts, PostActionTypes, SetPostsSuccess, SetPostsFailure } from '../actions/post.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { PaginationService } from '@app/shared';
import { Action } from '@ngrx/store';



@Injectable()
export class PostsEffects {



	constructor(
		private actions$: Actions,
		private page: PaginationService,
	) { }

	@Effect()
	getPosts: Observable<Action> = this.actions$.pipe(
		ofType<SetPosts>(PostActionTypes.SET_POSTS),
		switchMap(_ =>
			this.page.data.pipe(
				map(posts => new SetPostsSuccess(posts)),
				catchError(error => of(new SetPostsFailure(error)))
			)

		));

}
