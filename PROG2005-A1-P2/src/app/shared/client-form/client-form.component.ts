import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Client } from '../../services/client.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  @Input() initialData?: Client; // if we get an existing client.
  @Output() formSubmitted = new EventEmitter<Client>(); // Emit the form data to the parent
  clientForm!: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isEditing = !!this.initialData;
    this.clientForm = this.fb.group({
      id: [this.initialData?.id || '',  [Validators.required]],
      name: [this.initialData?.name || '', [Validators.required, Validators.minLength(3)]],
      // This method (below) is probably the dodgiest way of formatting a string as YYYY-MM-dd, but it works.
      dateOfBirth: [this.initialData?.dateOfBirth.toISOString().split('T')[0]  || '', [Validators.required]],
      gender: [this.initialData?.gender || 'Unspecified', [Validators.required]],
      program: [this.initialData?.program || '', [Validators.required]],
      email: [this.initialData?.email || '', [Validators.required, Validators.email]],
      phoneNumber: [this.initialData?.phoneNumber || '', [Validators.required]],

      startDate: [this.initialData?.startDate.toISOString().split('T')[0] || '', [Validators.required]],
      endDate: [this.initialData?.endDate.toISOString().split('T')[0] || '', [Validators.required]],
      notes: [this.initialData?.notes || ''],
      vip: [this.initialData?.vip || false]
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.formSubmitted.emit(this.clientForm.value);
      this.clientForm.reset(); // Reset form after submission
    }
  }
}
