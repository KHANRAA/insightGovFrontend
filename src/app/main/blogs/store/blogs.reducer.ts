import { Blog } from '../blogs.service';
import * as BlogsActions from './blogs.actions';

export interface State {
  blogs: Array<Blog>;
  blog: Blog;
}

const initialState: State = {
  blogs: [],
  blog: null
};

export function blogsReducer(state = initialState, action: BlogsActions.BlogsActions) {

  switch (action.type) {
    case BlogsActions.GET_BLOGS:
      return {
        ...state,
        blogs: JSON.parse(JSON.stringify(action.payload))
      };
    case BlogsActions.GET_BLOG:
      return {
        ...state,
        blog: JSON.parse(JSON.stringify(action.payload))
      };
    case BlogsActions.ADD_COMMENT:
      return {
        ...state
      };
    case BlogsActions.DELETE_COMMENT:
      return {
        ...state,
        blog: JSON.parse(JSON.stringify(action.payload))
      };
    default:
      return state;
  }
}
