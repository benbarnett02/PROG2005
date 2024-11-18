import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientFormComponent} from '../../shared/client-form/client-form.component';
import {Client, ClientService} from '../../services/client.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    ClientFormComponent,
    NgIf
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  // injected client service
  protected client?: Client;
  protected id?: string;

  constructor(private route: ActivatedRoute, private clientService: ClientService) {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.client = <Client | undefined>this.clientService.getClient(this.id!); // If ID isn't defined, we wouldn't have been routed here.
    if (!this.client) {
      console.error('Client not found!');
    }
// Just error out if the client isn't found... for now.


  }

  submit(x:Client){
    console.log(x);
    if (this.id != null) {
      this.clientService.updateClient(this.id, x);
    }
  }

}

