import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  deleteTodo,
  reorderTodos,
  updateTodo,
} from '../../../core/state/todo/todo.actions';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { Todo } from '../../../models/todo';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  imports: [
    CdkDropList,
    CdkDrag,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  private store = inject(Store);
  readonly dialog = inject(MatDialog);
  readonly panelOpenState = signal<{ [id: string]: boolean }>({});

  todos = this.store.selectSignal((state) => state.todo.todos);

  drop(event: CdkDragDrop<string[]>) {
    const todoItems = [...this.todos()];
    moveItemInArray(todoItems, event.previousIndex, event.currentIndex);
    this.store.dispatch(
      reorderTodos({
        orderedTodos: todoItems,
      })
    );
  }

  deleteTodo(todoId?: string) {
    if (todoId) this.store.dispatch(deleteTodo({ id: todoId }));
  }

  editTodo(todo: Todo) {
    this.dialog.open(TodoDialogComponent).componentInstance.edit(todo);
  }

  setCompletion(todo: Todo) {
    this.store.dispatch(
      updateTodo({ todo: { ...todo, completed: !todo.completed } })
    );
  }

  openStateChanged(id: string, isOpen: boolean) {
    const panelOpenStates = this.panelOpenState();
    panelOpenStates[id] = isOpen;
    this.panelOpenState.set(panelOpenStates);
  }
}
