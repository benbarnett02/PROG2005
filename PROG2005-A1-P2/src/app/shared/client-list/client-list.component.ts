import { Component } from '@angular/core';
import {Client, ClientService} from '../../services/client.service';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  protected readonly clients: Client[];

  constructor(private clientService: ClientService) {
    this.clients = this.clientService.getClients();
  }

  deleteClient(id: string) {

  }

}
