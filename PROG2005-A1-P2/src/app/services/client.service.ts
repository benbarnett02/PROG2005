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
      program: 'Fat Loss',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-12-31'),
      notes: 'VIP client',
      vip: true
    },
    {
      id: '2',
      name: 'Jane Doe',
      dateOfBirth: new Date('1995-01-10'),
      gender: 'Female',
      program: 'Muscle Gain',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-12-31'),
      notes: 'Not a VIP client',
      vip: false
    },
    {
      id: '3',
      name: 'Bob Smith',
      dateOfBirth: new Date('1817-01-01'),
      gender: 'Male',
      program: 'Muscle Gain',
      email: 'test@example.com',
      phoneNumber: '0404040404',
      startDate: new Date('2028-01-01'),
      endDate: new Date('2032-12-31'),
      notes: 'very important very vip guy.',
      vip: true
    },
    {
      id: '4',
      name: 'Alice',
      dateOfBirth: new Date('1820-01-01'),
      gender: 'Female',
      program: 'Muscle Gain',
      email: 'test@example.com',
      phoneNumber: '0404040404',
      startDate: new Date('2028-01-01'),
      endDate: new Date('2032-12-31'),
      notes: 'not very important..',
      vip: false
    },
  ];

  getClients(): Client[] {
    return this.clients;
  }

  // Option to use a predicate to get the clients you want. This is only used on VIP page.
  getFilteredClients(predicate: (client: Client) => boolean): Client[] {
    return this.clients.filter(predicate);
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
      throw new Error('Client not found!2');
    }
    this.clients[index] = updatedClient;
  }

  deleteClient(clientID: string): void {
    this.clients = this.clients.filter((c) => c.id !== clientID);
  }

  // Searches by name or email
  searchClient(query: string): Client[] {
    return this.clients.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase()));
  }



}
