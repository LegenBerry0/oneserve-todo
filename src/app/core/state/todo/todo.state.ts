import { Todo } from '../../../models/todo';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
};
