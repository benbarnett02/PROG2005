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
  @Input() filterPredicate: (client: Client) => boolean = (client: Client) => {
    return true;
  };

  protected clients?: Client[];

  // pass in a predicate for filtering clients.
  constructor(private clientService: ClientService) {
  }

  async deleteClient(id: string, event: MouseEvent): Promise<void> {
    let confirmed: boolean = await this.showConfirmationModal('Are you sure you want to delete this client?');
    console.log(confirmed);
    if (confirmed) {
      this.clientService.deleteClient(id)
      console.log("deleted");
    }
    ;
    this.clients = this.clientService.getClients().filter(this.filterPredicate);
  }

  async showConfirmationModal(message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log("showing confirmation modal");
      const confirmation = document.getElementById("deletion-confirmation") as HTMLDialogElement;
      confirmation.showModal();
      document.getElementById("del-no")?.addEventListener('click', () => {
        resolve(false);
        console.log("n");
        confirmation.close();
        return false;
      });
      document.getElementById("del-yes")?.addEventListener('click', () => {
        resolve(true);
        console.log("y");
        confirmation.close();
        return true;
      });
      document.getElementById("deletion-confirmation")?.addEventListener('close', () => {
        resolve(false);
        console.log("close");
        return false;
      });
    });
  }

  ngOnInit() {
    this.clients = this.clientService.getClients().filter(this.filterPredicate);
  }

  search(): void {
    const searchBox = document.getElementById('search-box') as HTMLInputElement;
    const query = searchBox.value;
    if(query === '') {
      // if the query is empty, show clients with the normal filter.
      this.clients = this.clientService.getClients().filter(this.filterPredicate);

    }
    // search but also apply our normal predicate if there is one.
    this.clients = this.clientService.searchClient(query).filter(this.filterPredicate) || [];

  }


}
