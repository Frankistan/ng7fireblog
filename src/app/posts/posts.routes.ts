import { Routes } from "@angular/router";
import { DiscardChangesGuard } from "@app/shared/guards/discard-changes.guard";
import { PostFormComponent } from "./post-form/post-form.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostShowComponent } from "./post-show/post-show.component";
import { extract } from "@app/shared/services/i18n.service";
import { PreloadPostsGuard } from "@app/shared/guards/preload-posts.guard";



export const postsRoutes: Routes = [
	{
		path: "",
		component: PostListComponent,
		// canActivate: [PreloadPostsGuard],
		data: {
			title: extract("posts.list"),
			animation: {
				value: "posts"
			}
		}
	},
	{
		path: "create",
		component: PostFormComponent,
		canDeactivate: [DiscardChangesGuard],
		data: {
			title: extract("posts.create"),
			animation: {
				value: "create"
			}
		}
	},
	{
		path: ":id",
		component: PostShowComponent,
		data: {
			title: extract("posts.show"),
			animation: {
				value: "show"
			}
		}
	},
	{
		path: ":id/edit",
		component: PostFormComponent,
		canDeactivate: [DiscardChangesGuard],
		data: {
			title: extract("posts.edit"),
			animation: {
				value: "edit"
			}
		}
	}
];