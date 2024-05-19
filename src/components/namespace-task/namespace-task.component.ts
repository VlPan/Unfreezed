import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {Task} from '../../models/task';

@Component({
  selector: 'app-namespace-task',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: 'namespace-task.component.html',
  styleUrl: './namespace-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NamespaceTaskComponent {
  @Input() task: Task;
}
