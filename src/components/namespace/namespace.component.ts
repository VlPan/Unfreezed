import { CommonModule, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {Namespace} from '../../models/namespace';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {
  MatDialog,
} from '@angular/material/dialog';
import {CreateTaskDialogComponent} from '../dialogs/create-task-dialog/create-task-dialog.component';
import {TasksService} from '../../services/tasks.service';
import {NamespaceTaskComponent} from '../namespace-task/namespace-task.component';
import {NamespaceUI} from '../../models/ui/namespaces-ui';

@Component({
  selector: 'app-namespace',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgStyle,
    NamespaceTaskComponent
  ],
  templateUrl: `namespace.component.html`,
  styleUrl: './namespace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NamespaceComponent {
  @Input() namespace: NamespaceUI;
  constructor(public dialog: MatDialog, private readonly taskService: TasksService) {}

  ngOnChanges() {
    console.log('namespace:: ', this.namespace);
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '300px',
      data: {
        namespace: this.namespace
      }
    });

    dialogRef.afterClosed().subscribe(task => {
      if(task) {
        console.log('created task', task);
        this.taskService.addTask(task);
      }
    });
  }
}
