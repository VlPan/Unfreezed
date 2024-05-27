import {CommonModule, NgFor} from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ConfigureRandomTasksDialogData} from '../../../models/ui/configure-random-tasks-dialog-data';
import {RandomTask} from '../../../models/trandom-task';
import {MatIconModule} from '@angular/material/icon';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-configure-random-tasks-dialog',
  templateUrl: 'configure-random-tasks-dialog.component.html',
  styleUrls: ['./configure-random-tasks-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatIconButton,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgFor
  ],
})

export class ConfigureRandomTasksDialogComponent implements OnInit {
  private randomTasks: RandomTask[] = [];
  tasksForm: FormGroup = this.fb.group({
    tasks: this.fb.array([])
  });
  
  constructor(
    public dialogRef: MatDialogRef<ConfigureRandomTasksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigureRandomTasksDialogData,
    private fb: FormBuilder
  ) { 
    this.randomTasks = this.data.randomTasks;
    for (const task of this.randomTasks) {
      this.addTask(task)
    }

    console.log('Random Tasks', this.randomTasks);
    console.log('Tasks', this.tasks);
  }

  ngOnInit() { }

  addTask(task?: RandomTask) {
    const tasksForm = this.fb.group({
        title: [task?.title || '', [Validators.required]],
        weight: [task?.weight || 1, Validators.min(1)],
        id: task?.id || uuidv4(), 
    });
  
    this.tasks.push(tasksForm);
  }
  
  deleteTask(index: number) {
    console.log('', );
      this.tasks.removeAt(index);
  }

  updateRandomTasks() {
    this.dialogRef.close(this.tasks.value);
  }

  get tasks() {
    return this.tasksForm.controls["tasks"] as FormArray;
  }
}