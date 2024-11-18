// Benjamin Barnett | Student ID: 23776070
// PROG2005 Assignment 2 Part 2

import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ClientFormComponent} from '../../shared/client-form/client-form.component';
import {ClientListComponent} from '../../shared/client-list/client-list.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ClientFormComponent,
    ClientListComponent,
    RouterLink
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

}
