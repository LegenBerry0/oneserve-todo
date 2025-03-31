import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../../../shared/components/todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-navigation',
  imports: [
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  title = 'Todo';

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(TodoDialogComponent);
  }
}
