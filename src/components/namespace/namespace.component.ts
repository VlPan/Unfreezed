import { CommonModule, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Namespace } from '../../models/namespace';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../dialogs/create-task-dialog/create-task-dialog.component';
import { TasksService } from '../../services/tasks.service';
import { NamespaceTaskComponent } from '../namespace-task/namespace-task.component';
import { NamespaceUI } from '../../models/ui/namespaces-ui';
import { FrozenStatus, Task } from '../../models/task';
import { FreezeTaskDialogComponent } from '../dialogs/freeze-task-dialog/freeze-task-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { RandomTasksService } from '../../services/random-tasks.service';
import { v4 as uuidv4 } from 'uuid';
import { AddLinkDialogComponent } from '../dialogs/add-link-dialog/add-link-dialog.component';
import { UIStateService } from '../../services/ui-state.service';
import {MatMenuModule} from '@angular/material/menu';
import {NamespacesService} from '../../services/namespaces.service';
import {ConfigureRandomTasksDialogComponent} from '../dialogs/configure-random-tasks-dialog/configure-random-tasks-dialog.component';
import {RandomTask} from '../../models/trandom-task';

@Component({
  selector: 'app-namespace',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgStyle,
    NamespaceTaskComponent,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: `namespace.component.html`,
  styleUrl: './namespace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NamespaceComponent {
  @Input() namespace: NamespaceUI;
  @Input() isFocused: boolean = false;
  @Output() focusedOnNamespace: EventEmitter<NamespaceUI['id']> =
    new EventEmitter();
  constructor(
    public dialog: MatDialog,
    private readonly taskService: TasksService,
    private randomTaskService: RandomTasksService,
    private namespaceService: NamespacesService,
    public uiStateService: UIStateService,
  ) {}

  ngOnChanges() {
    console.log('namespace:: ', this.namespace);
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '300px',
      data: {
        namespace: this.namespace,
      },
    });

    dialogRef.afterClosed().subscribe((task) => {
      if (task) {
        console.log('created task', task);
        this.taskService.addTask(task);
      }
    });
  }

  createTaskFromRandom() {
    const possibleRandomTasks = Object.values(
      this.randomTaskService.randomTasks()
    ).filter((t) => t.namespaceId === this.namespace.id);
    const randomTask =
      this.randomTaskService.getRandomTask(possibleRandomTasks);

    const task: Task = {
      id: uuidv4(),
      namespaceId: this.namespace.id,
      title: randomTask.title,
      isCompleted: false,
      isFrozen: null,
      frozenReason: null,
      attachedLinks: [],
    };
    this.taskService.addTask(task);
  }

  addLink(task: Task) {
    const dialogRef = this.dialog.open(AddLinkDialogComponent);

    dialogRef
      .afterClosed()
      .subscribe((link: { caption: string; url: string }) => {
        if (link) {
          this.taskService.updateTask(task.id, {
            attachedLinks: [...(task.attachedLinks || []), link],
          });
        }
      });
  }

  updateTaskCompletion(task: Task, isCompleted: boolean) {
    this.taskService.updateTask(task.id, { isCompleted, isFrozen: null, isImportant: false });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }

  freezeTask(status: FrozenStatus, task: Task) {
    const dialogRef = this.dialog.open(FreezeTaskDialogComponent);
    dialogRef.afterClosed().subscribe((reason) => {
      this.taskService.updateTask(task.id, {
        isFrozen: status,
        frozenReason: reason || null,
      });
    });
  }

  unfreezeTask(task: Task) {
    this.taskService.updateTask(task.id, {
      isFrozen: null,
      frozenReason: null,
    });
  }

  focusOnNamespace() {
    this.focusedOnNamespace.emit(this.namespace.id);
  }

  nextTimer() {
    this.uiStateService.addTime(this.namespace.id);
  }

  updateImportance(task: Task, isImportant) {
    this.taskService.updateTask(task.id, {
      isImportant,
    });
  }

  deleteNamespace() {
    this.namespaceService.deleteNamespace(this.namespace);
    this.taskService.deleteTasksByNamespaceId(this.namespace.id);
    this.randomTaskService.deleteTasksByNamespaceId(this.namespace.id);
  }

  configureRandomTasks() {
    const randomTasks = this.randomTaskService.getRandomTasksByNamespaceId(this.namespace.id);
    const dialogRef = this.dialog.open(ConfigureRandomTasksDialogComponent, { data: {randomTasks }});
    dialogRef.afterClosed().subscribe((tasks) => {
      const updatedTasksInNamespace: RandomTask[] = tasks.map(t => ({...t, namespaceId: t.namespaceId}))
      this.randomTaskService.replaceTasksInNamespace(this.namespace.id, updatedTasksInNamespace)
    });
  }
}
