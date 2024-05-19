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
  selector: 'app-freeze-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: `./freeze-task-dialog.component.html`,
  styleUrl: './freeze-task-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FreezeTaskDialogComponent implements OnInit  {
  freezeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FreezeTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateTaskDialogData,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.freezeForm = this.formBuilder.group({
      reason: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.freezeForm.get('reason').value);
  }
}
