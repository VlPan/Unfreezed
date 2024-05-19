import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {Task} from '../../models/task';
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
  @Input() task: Task;
  @Output() taskToggled = new EventEmitter<boolean>();
  @Output() deleted = new EventEmitter<Task>();
  @Output() freezed = new EventEmitter<Task>();
  @Output() unfreeze = new EventEmitter<Task>();

  toggleTask(value: MatCheckboxChange) {
    this.taskToggled.emit(value.checked)
  }

  onDelete() {
    this.deleted.emit(this.task)
  }

  onFreeze() {
    this.freezed.emit(this.task)
  }

  onUnfreeze() {
    this.unfreeze.emit(this.task)
  }
}