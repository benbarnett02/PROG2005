import { Component } from '@angular/core';
import {ClientListComponent} from '../../shared/client-list/client-list.component';
import {Client, ClientService} from '../../services/client.service';

@Component({
  selector: 'app-vip-client',
  standalone: true,
  imports: [
    ClientListComponent
  ],
  templateUrl: './vip-client.component.html',
  styleUrl: './vip-client.component.css'
})
export class VipClientComponent {

  constructor() {
  }

 filterPredicate = (c: Client) => c.vip;
}
