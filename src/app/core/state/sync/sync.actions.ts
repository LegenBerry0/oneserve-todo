import { createAction, props } from '@ngrx/store';

export const syncState = createAction(
  '[Sync] State Sync',
  props<{ state: any }>()
);
