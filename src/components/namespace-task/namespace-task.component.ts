import { CommonModule, Location, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {FrozenStatus, Task} from '../../models/task';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-namespace-task',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    NgClass,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: 'namespace-task.component.html',
  styleUrl: './namespace-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NamespaceTaskComponent {

  FrozenStatus = FrozenStatus
  constructor() {}

  @Input() task: Task;
  @Output() taskToggled = new EventEmitter<boolean>();
  @Output() deleted = new EventEmitter<Task>();
  @Output() freezed = new EventEmitter<FrozenStatus>();
  @Output() unfreeze = new EventEmitter<Task>();
  @Output() linkAdded = new EventEmitter<Task>();
  @Output() toggleImportant = new EventEmitter<boolean>();

  toggleTask(value: MatCheckboxChange) {
    this.taskToggled.emit(value.checked)
  }

  onDelete() {
    this.deleted.emit(this.task)
  }

  onFreeze(status: FrozenStatus) {
    this.freezed.emit(status)
  }

  onUnfreeze() {
    this.unfreeze.emit(this.task)
  }

  onAddLink() {
    this.linkAdded.emit(this.task)
  }

  navigate(link) {
    window.open(link.url, '_blank');
  }
}
