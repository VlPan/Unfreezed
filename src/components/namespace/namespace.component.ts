import { CommonModule, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
import {Task} from '../../models/task';
import {FreezeTaskDialogComponent} from '../dialogs/freeze-task-dialog/freeze-task-dialog.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-namespace',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgStyle,
    NamespaceTaskComponent,
    MatIconModule
  ],
  templateUrl: `namespace.component.html`,
  styleUrl: './namespace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NamespaceComponent {
  @Input() namespace: NamespaceUI;
  @Input() isFocused: boolean = false;
  @Output() focusedOnNamespace: EventEmitter<NamespaceUI['id']> = new EventEmitter();
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

  updateTaskCompletion(task: Task, isCompleted: boolean) {
    this.taskService.updateTask(task.id, {isCompleted})
    console.log('updateTaskCompletion', task, isCompleted);
  }

  deleteTask(task: Task) {
    console.log('%c ---> DELETE ', 'color: #de4209', task);
    this.taskService.deleteTask(task);
  }

  freezeTask(task: Task) {
    console.log('%c ---> FREEZE ', 'color: #de4209', task);
    const dialogRef = this.dialog.open(FreezeTaskDialogComponent);
    dialogRef.afterClosed().subscribe(reason => {
      this.taskService.updateTask(task.id, {isFrozen: true, frozenReason: reason || null});
    })
  }

  unfreezeTask(task: Task) {
    console.log('%c ---> UNFREEZE ', 'color: #de4209', task);
    this.taskService.updateTask(task.id, {isFrozen: false, frozenReason: null});
  }

  focusOnNamespace() {
    this.focusedOnNamespace.emit(this.namespace.id);
  }
}
