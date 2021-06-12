import { Blog } from '../blogs.service';
import * as BlogsActions from './blogs.actions';

export interface State {
  blogs: Array<Blog>;
  blog;
}

const initialState: State = {
  blogs: [],
  blog: {}
};

export function blogsReducer(state = initialState, action: BlogsActions.BlogsActions) {

  switch (action.type) {
    case BlogsActions.GET_BLOGS:
      return {
        ...state,
        blogs: [...action.payload]
      };
    case BlogsActions.GET_BLOG:
      return {
        ...state,
        blog: JSON.parse(JSON.stringify(action.payload))
      };
    default:
      return state;
  }
}
