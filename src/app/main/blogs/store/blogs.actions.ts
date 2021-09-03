import { Action } from '@ngrx/store';
import { Blog, Comment } from '../blogs.service';

export const GET_BLOGS = '[Blogs] Get Blogs';
export const GET_BLOG = '[Blogs] Get Blog';
export const ADD_COMMENT = '[Blogs] Add Comment';
export const DELETE_COMMENT = '[Blogs] Delete Comment';

export class GetBlogs implements Action {
  readonly type = GET_BLOGS;

  constructor(public payload: Array<Blog>) {}
}

export class GetBlog implements Action {
  readonly type = GET_BLOG;

  constructor(public payload: Blog) {}
}

export class AddComment implements Action {
  type = ADD_COMMENT;

  constructor(public payload: Comment) {}
}

export class DeleteComment implements Action {
  type = DELETE_COMMENT;

  constructor(public payload: Comment) {}
}


export  type BlogsActions = GetBlogs | GetBlog | AddComment | DeleteComment;
