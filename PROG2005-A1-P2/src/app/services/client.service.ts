import {Injectable} from '@angular/core';

export interface Client {
  id: string;
  name: string;
  dateOfBirth: Date;
  gender: 'Female' | 'Male' | 'Unspecified';
  program: string;
  email: string;
  phoneNumber: string;
  startDate: Date;
  endDate: Date;
  notes?: string;
  vip: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clients: Client[] = [
    {
      id: '1',
      name: 'John Doe',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'Male',
      program: 'Weight Loss',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2021-12-31'),
      notes: 'VIP client',
      vip: true
    },
    {
      id: '2',
      name: 'Jane Doe',
      dateOfBirth: new Date('1995-01-10'),
      gender: 'Female',
      program: 'Body Building',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2021-12-31'),
      notes: 'Not a VIP client',
      vip: false
    }
  ];

  getClients(): Client[] {
    return this.clients;
  }

  getClient(clientID: string): Client | undefined {
    return this.clients.find((c) => c.id === clientID);
  }

  addClient(client: Client): void {
    if (this.clients.some((c) => c.id === client.id)) {
      throw new Error('Client ID must be unique!');
    }
    this.clients.push(client);
  }

  updateClient(clientID: string, updatedClient: Client): void {
    const index = this.clients.findIndex((c) => c.id === clientID);
    if (index === -1) {
      throw new Error('Client not found!');
    }
    this.clients[index] = updatedClient;
  }

  deleteClient(clientID: string): void {
    this.clients = this.clients.filter((c) => c.id !== clientID);
  }

  searchClient(clientID: string): Client | undefined {
    return this.clients.find((c) => c.id === clientID);
  }


}
