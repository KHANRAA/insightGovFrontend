import { Action } from '@ngrx/store';
import { Blog } from '../blogs.service';

export const GET_BLOGS = '[Blogs] Get Blogs';
export const GET_BLOG = '[Blogs] Get Blog';

export class GetBlogs implements Action {
  readonly type = GET_BLOGS;

  constructor(public payload: Array<Blog>) {}
}

export class GetBlog implements Action {
  readonly type = GET_BLOG;

  constructor(public payload: Blog) {}
}

export  type BlogsActions = GetBlogs | GetBlog;
