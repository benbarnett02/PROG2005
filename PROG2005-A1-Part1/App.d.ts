declare class Client {
    readonly id: string;
    name: string;
    gender: enumGender;
    dateOfBirth: Date;
    program: enumProgram;
    startDate: Date;
    endDate: Date;
    notes?: string;
    vip: boolean;
    private _email;
    private _phoneNumber;
    get email(): string;
    set email(value: string);
    get phoneNumber(): string;
    set phoneNumber(value: string);
    constructor(id: string, name: string, gender: enumGender, dateOfBirth: Date, program: enumProgram, email: string, phoneNumber: string, startDate: Date, endDate: Date, notes?: string, vip?: boolean);
}
declare enum enumGender {
    unspecified = "Unspecified",
    female = "Female",
    male = "Male"
}
declare enum enumProgram {
    unspecified = "Unspecified",
    FatLoss = "Fat Loss",
    Senior = "Senior Fitness",
    Muscle = "Muscle Gain",
    Natal = "Pre/Post Natal Fitness",
    Contest = "Contest Preparation",
    General = "Overall Fitness"
}
declare let clients: Client[];
declare function addClient(client: Client): string;
declare function submitClientForm(): void;
declare function getClientFromForm(): Client;
declare function updateClient(clientID: string, updatedInfo: Partial<Client>): string;
declare function displayDeletionConfirmation(clientID: string): void;
declare function hideDeletionConfirmation(): void;
declare function deleteClient(clientID: string): void;
declare function searchClient(clientID: string): Client | undefined;
declare function displayClients(): void;
declare function displayVIPClients(): void;
declare function formatClient(client: Client): string;
declare function populateEditForm(clientID: string): void;
declare let editingClientID: string | null;
declare function switchToEditMode(clientID: string): void;
declare function disableEditMode(): void;
