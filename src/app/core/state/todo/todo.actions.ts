import { createAction, props } from '@ngrx/store';
import { Todo } from '../../../models/todo';

export const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo }>());

export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ todo: Todo }>()
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: string }>()
);

export const loadTodos = createAction(
  '[Todo] Load Todos',
  props<{ todos: Array<Todo> }>()
);

export const reorderTodos = createAction(
  '[Todo] Reorder Todos',
  props<{ orderedTodos: Array<Todo> }>()
);
