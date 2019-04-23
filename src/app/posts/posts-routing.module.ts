import { NgModule } from '@angular/core';
import { PostsComponent } from '@app/posts';
import { postsRoutes } from '@app/posts/posts.routes';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: "",
		component: PostsComponent,
		children: postsRoutes
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PostsRoutingModule { }
