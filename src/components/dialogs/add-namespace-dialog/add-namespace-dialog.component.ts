import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-add-namespace-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatSliderModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: `./add-namespace-dialog.component.html`,
  styleUrl: './add-namespace-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNamespaceDialogComponent implements OnInit  {
  addNamespaceForm: FormGroup;

  // priority = new FormControl('', [Validators.min(1), Validators.max(10)]);

  constructor(
    public dialogRef: MatDialogRef<AddNamespaceDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addNamespaceForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      priority: [5, [Validators.min(1), Validators.max(10)]],
      color: ['', [Validators.required]],
      focusColor: ['', [Validators.required]],
    });
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close({
      id: uuidv4(),
      isShown: true,
      name: this.addNamespaceForm.get('name').value,
      priority: this.addNamespaceForm.get('priority').value,
      color: this.addNamespaceForm.get('color').value,
      focusColor: this.addNamespaceForm.get('focusColor').value,
    });
  }
}
