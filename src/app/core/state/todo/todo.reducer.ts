import { createReducer, on } from '@ngrx/store';
import {
  addTodo,
  deleteTodo,
  loadTodos,
  reorderTodos,
  updateTodo,
} from './todo.actions';
import { Todo } from '../../../models/todo';
import { generateTempId } from '../../util/id-generator';
import { syncState } from '../sync/sync.actions';

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
};

export const todoReducer = createReducer(
  initialState,
  on(syncState, (state, { state: newState }) => {
    return { ...state, ...newState.todoState };
  }),
  on(loadTodos, (state, { todos }) => ({ ...state, todos })),
  on(addTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, { ...todo, id: generateTempId() }],
  })),
  on(updateTodo, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? { ...todo } : t)),
  })),
  on(deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== id),
  })),
  on(reorderTodos, (state, { orderedTodos }) => ({
    ...state,
    todos: [...orderedTodos],
  }))
);
