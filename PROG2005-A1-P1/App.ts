class Client {
    public readonly id: string; // Using a string - we're never going to do math on it so why constrain ourselves to a number?
    public name: string;
    public gender: enumGender;
    public dateOfBirth: Date;
    public program: enumProgram;

    private _email!: string;
    private _phoneNumber!: string;

    public startDate: Date;
    public endDate: Date;

    public notes?: string;
    public vip: boolean = false;

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        if (value.length > 0 && value.indexOf("@") > 0) {
            this._email = value;
        } else {
            throw new Error("Invalid email address");
        }
    }

    public get phoneNumber(): string {
        return this._phoneNumber;
    }

    public set phoneNumber(value: string) {
        if (value.length == 10 && value.indexOf("04") == 0) { // Maybe we only want Australian numbers & no country code (start with 04)
            this._phoneNumber = value;
        } else {
            throw new Error("Invalid phone number");
        }
    }

    constructor(id: string, name: string, gender: enumGender, dateOfBirth: Date, program: enumProgram, email: string, phoneNumber: string, startDate: Date, endDate: Date, notes?: string) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.program = program;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes;
    }

}

enum enumGender {
    unspecified = "Unspecified",
    female = "Female",
    male = "Male"
}

enum enumProgram {
    unspecified = "Unspecified",
    FatLoss = "Fat Loss",
    Senior = "Senior Fitness",
    Muscle = "Muscle Gain",
    Natal = "Pre/Post Natal Fitness",
    Contest = "Contest Preparation",
    General = "Overall Fitness"
}


let clients: Client[] = [
    // Optional initial data
    new Client("1", "Alice", enumGender.female, new Date(1990, 1, 1), enumProgram.FatLoss, "test@example.com", "0404999888", new Date(2024, 1, 1), new Date(2025, 1, 1), ""),
];


// Add a new client
function addClient(client: Client): string {
    if (clients.some(existingClient => existingClient.id === client.id)) {
        return "Error: Client ID must be unique.";
    }
    clients.push(client);
    displayClients();
    return "Client added successfully!";
}


// On submit button click
function submitClientForm(): void {
    if (editingClientID) {
        // Update existing client
        const updatedClient = getClientFromForm()// Client from form function goes here
        updateClient(editingClientID, updatedClient);
    } else {
        // Add new client
        const newClient = getClientFromForm() // Client from form function goes here
        addClient(newClient);
    }
}

function getClientFromForm(): Client {
    return new Client(
        (document.getElementById("id") as HTMLInputElement).value,
        (document.getElementById("name") as HTMLInputElement).value,
        (document.getElementById("gender") as HTMLSelectElement).value as enumGender,
        new Date((document.getElementById("dateOfBirth") as HTMLInputElement).value),
        (document.getElementById("program") as HTMLSelectElement).value as enumProgram,
        (document.getElementById("email") as HTMLInputElement).value,
        (document.getElementById("phoneNumber") as HTMLInputElement).value,
        new Date((document.getElementById("startDate") as HTMLInputElement).value),
        new Date((document.getElementById("endDate") as HTMLInputElement).value),
        (document.getElementById("notes") as HTMLInputElement).value
    )
}

// Update an existing client
function updateClient(clientID: string, updatedInfo: Partial<Client>): string {
    const client = clients.find(c => c.id === clientID);
    if (!client) return "Error: Client not found.";

    Object.assign(client, updatedInfo); // Merge updated info into client
    displayClients();
    return "Client updated successfully!";
}

// Delete a client with confirmation
function deleteClient(clientID: string): string {
    if (confirm(`Are you sure you want to delete client with ID ${clientID}?`)) {
        clients = clients.filter(client => client.id !== clientID);
        displayClients();
        return "Client deleted successfully!";
    }
    return "Action canceled.";
}


// Search for a client by ID
function searchClient(clientID: string): Client | undefined {
    return clients.find(client => client.id === clientID);
}

// Display all clients
function displayClients(): void {
    const displayDiv = document.getElementById("client-display");
    if (displayDiv) {
        displayDiv.innerHTML = clients.map(client => formatClient(client)).join("");
    }
}

window.onload = () => {
    displayClients();
    displayVIPClients();
}

// Display all VIP clients
function displayVIPClients(): void {
    const vipClients = clients.filter(client => client.vip);
    const displayDiv = document.getElementById("vip-client-display");
    if (displayDiv) {
        displayDiv.innerHTML = vipClients.map(client => formatClient(client)).join("");
    }
}


// Helper to format client data for display
function formatClient(client: Client): string {
    return `
    <div class="client-card">
      <h3>${client.name} ${client.vip ? "(VIP)" : ""}</h3>
      <p>ID: ${client.id}</p>
      <p>Date of Birth: ${client.dateOfBirth.toLocaleDateString()}</p>
      <p>Gender: ${client.gender}</p>
      <p>Fitness Program: ${client.program}</p>
      <p>Email: ${client.email}</p>
      <p>Phone: ${client.phoneNumber}</p>
      <p>Joined: ${client.startDate.toLocaleDateString()}</p>
      <p>Ending: ${client.endDate.toLocaleDateString()}</p>
      <p>Notes: ${client.notes || "N/A"}</p>
        <button onclick="switchToEditMode('${client.id}')">Edit</button>
        <button onclick="deleteClient('${client.id}')">Delete</button>
    </div>
  `;
}


function addClientFromForm(): void {
    const clientID = (document.getElementById("id") as HTMLInputElement).value;

    // Other form values...

    const newClient: Client =
        new Client(clientID, "Alice", enumGender.female, new Date(1990, 1, 1), enumProgram.FatLoss, "test@example.com", "0404999888", new Date(2024, 1, 1), new Date(2025, 1, 1), "");


    let action = addClient(newClient);
}


// Populate the edit form
function populateEditForm(clientID: string): void {
    const client = clients.find(c => c.id === clientID);
    if (!client) {
        console.error("Client not found!");
        return;
    }

    // Switch to edit mode - make the id field read-only
    (document.getElementById("clientID") as HTMLInputElement).readOnly = true;
    // Populate form fields with client data
    (document.getElementById("clientID") as HTMLInputElement).value = client.id;
    (document.getElementById("name") as HTMLInputElement).value = client.name;
    (document.getElementById("dateOfBirth") as HTMLInputElement).value = client.dateOfBirth?.toISOString().split("T")[0] || "";
    (document.getElementById("gender") as HTMLSelectElement).value = client.gender;
    (document.getElementById("fitnessProgram") as HTMLSelectElement).value = client.program;
    (document.getElementById("email") as HTMLInputElement).value = client.email;
    (document.getElementById("phoneNumber") as HTMLInputElement).value = client.phoneNumber;
    (document.getElementById("startDate") as HTMLInputElement).value = client.startDate?.toISOString().split("T")[0] || "";
    (document.getElementById("endDate") as HTMLInputElement).value = client.endDate?.toISOString().split("T")[0] || "";
    (document.getElementById("notes") as HTMLInputElement).value = client.notes || "";
}

let editingClientID: string | null = null; // Keeps track of the client being edited

function switchToEditMode(clientID: string): void {
    populateEditForm(clientID); // Fill the form with existing data
    editingClientID = clientID; // Set the client being edited

    // Update the form button label
    const submitButton = document.getElementById("form-submit-button") as HTMLButtonElement;
    submitButton.textContent = "Update Client";
}


