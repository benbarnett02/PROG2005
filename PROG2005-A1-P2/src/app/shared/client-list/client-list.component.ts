import {Component, Input} from '@angular/core';
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
  @Input() filterPredicate: (client: Client) => boolean = () => true;
  protected readonly clients: Client[];

  // pass in a predicate for filtering clients.
  constructor(private clientService: ClientService) {
    this.clients = this.clientService.getFilteredClients((client :Client) => this.filterPredicate(client));
  }

  deleteClient(id: string) {

  }



}
