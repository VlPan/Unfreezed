import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-add-link-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: `./add-link-dialog.component.html`,
  styleUrl: './add-link-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLinkDialogComponent implements OnInit  {
  addLinkForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddLinkDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const regex = new RegExp(expression);

    this.addLinkForm = this.formBuilder.group({
      caption: ['', [Validators.required]],
      url: ['', [Validators.required, Validators.pattern(regex)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close({
      caption: this.addLinkForm.get('caption').value,
      url: this.addLinkForm.get('url').value,
    });
  }
}
