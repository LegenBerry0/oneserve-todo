import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { Todo } from '../../../models/todo';
import { Store } from '@ngrx/store';
import { addTodo, updateTodo } from '../../../core/state/todo/todo.actions';

@Component({
  selector: 'todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrl: './todo-dialog.component.scss',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDialogComponent implements OnInit {
  private unchangedValue: Todo | undefined;
  private store = inject(Store);

  todoForm!: FormGroup;
  isEdit = signal(false);

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      completed: new FormControl(false),
    });

    if (this.unchangedValue) {
      this.todoForm.patchValue(this.unchangedValue);
    }
  }

  onSubmit() {
    if (this.todoForm.valid) {
      if (this.isEdit()) {
        this.store.dispatch(
          updateTodo({
            todo: { ...this.unchangedValue, ...this.todoForm.value },
          })
        );
      } else {
        this.store.dispatch(addTodo({ todo: this.todoForm.value }));
      }
      this.todoForm.reset({ title: '', description: '', completed: false });
    }
  }

  edit(todoItem: Todo) {
    this.unchangedValue = todoItem;
    this.isEdit.set(true);
  }
}
