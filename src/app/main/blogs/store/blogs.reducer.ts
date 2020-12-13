import { Blog } from '../blogs.service';
import * as BlogsActions from './blogs.actions';

export interface State {
  blogs: Array<Blog>;
}

const initialState: State = {
  blogs: []
};

export function blogsReducer(state = initialState, action: BlogsActions.BlogsActions) {

  switch (action.type) {
    case BlogsActions.GET_BLOGS:
      return {
        ...state,
        blogs: [...action.payload]
      };
    default:
      return state;
  }
}
