import { Component } from '@angular/core';
import {Client, ClientService} from '../../services/client.service';
import {ClientFormComponent} from '../../shared/client-form/client-form.component';

@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [
    ClientFormComponent
  ],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.css'
})
export class NewClientComponent {

  constructor(private clientService: ClientService) {
  }

  submit(x:Client) {
    console.log('submit');
    this.clientService.addClient(x);
  }
}
