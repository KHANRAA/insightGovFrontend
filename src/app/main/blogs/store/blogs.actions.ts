import { Action } from '@ngrx/store';
import { Blog } from '../blogs.service';

export const GET_BLOGS = '[Blogs] Get Blogs';

export class GetBlogs implements Action {
  readonly type = GET_BLOGS;

  constructor(public payload: Array<Blog>) {}
}

export  type BlogsActions = GetBlogs;
