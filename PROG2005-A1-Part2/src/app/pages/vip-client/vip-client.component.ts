// Benjamin Barnett | Student ID: 23776070
// PROG2005 Assignment 2 Part 2

import { Component } from '@angular/core';
import {ClientListComponent} from '../../shared/client-list/client-list.component';
import {Client} from '../../services/client.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-vip-client',
  standalone: true,
  imports: [
    ClientListComponent,
    RouterLink
  ],
  templateUrl: './vip-client.component.html',
  styleUrl: './vip-client.component.css'
})
export class VipClientComponent {

  constructor() {
  }

 filterPredicate = (c: Client) => c.vip;
}
