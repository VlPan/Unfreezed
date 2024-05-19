import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {CreateTaskDialogData} from '../../../models/ui/create-task-dialog-data';
import {Task} from '../../../models/task';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: `./create-task-dialog.component.html`,
  styleUrl: './create-task-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskDialogComponent implements OnInit  {
  private task: Task;
  titleForm: FormGroup;
  title: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateTaskDialogData,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.titleForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if(this.titleForm.valid) {
      this.task = {
        id: uuidv4(),
        namespaceId: this.data.namespace.id,
        title: this.titleForm.get('title').value,
        isCompleted: false,
        isFrozen: false,
        frozenReason: null
      }

      this.dialogRef.close(this.task);
    }
  }
}
