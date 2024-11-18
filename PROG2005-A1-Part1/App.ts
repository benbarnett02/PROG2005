// Benjamin Barnett | Student ID: 23776070
// PROG2005 Assignment 2 Part 1

class Client {
    public readonly id: string; // Using a string - we're never going to do math on it so why constrain ourselves to a number?
    public name: string;
    public gender: enumGender;
    public dateOfBirth: Date;
    public program: enumProgram;
    public startDate: Date;
    public endDate: Date;
    public notes?: string;
    public vip: boolean = false;

    private _email!: string;
    private _phoneNumber!: string;

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
        this._phoneNumber = value;
        // was going to do validation here, but it's not required & clunky.
    }

    constructor(id: string, name: string, gender: enumGender, dateOfBirth: Date, program: enumProgram, email: string, phoneNumber: string, startDate: Date, endDate: Date, notes?: string, vip?: boolean) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.program = program;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes || "";
        this.vip = vip || false;
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
    new Client("1", "Alice", enumGender.female, new Date(1990, 1, 1), enumProgram.FatLoss, "test@example.com", "0404999888", new Date(2024, 1, 1), new Date(2025, 1, 1), "", false),
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


// On submit button click (defined in html)
function submitClientForm(): void {
    if (editingClientID) {
        updateClient(editingClientID, getClientFromForm());
        editingClientID = null;
        disableEditMode();
    } else {
        addClient(getClientFromForm());
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
        (document.getElementById("notes") as HTMLInputElement).value,
        (document.getElementById("vip") as HTMLInputElement).checked
    )
}

// Update an existing client
function updateClient(clientID: string, updatedInfo: Partial<Client>): string {
    const client = clients.find(c => c.id === clientID);
    if (!client) return "Error: Client not found.";

    Object.assign(client, updatedInfo); // Merge updated info into client
    displayClients();
    editingClientID = null; // Reset editing mode
    return "Client updated successfully!";
}

function displayDeletionConfirmation(clientID: string): void {
    // Display a confirmation WITHOUT using the browser confirm() dialog
    const confirmation = document.getElementById("deletion-confirmation");
    if (confirmation) {
        confirmation.innerHTML = `Are you sure you want to delete client with ID ${clientID}?
        <button onclick="deleteClient('${clientID}')">Yes</button>
        <button onclick="hideDeletionConfirmation()">Cancel</button>
        `;
        confirmation.style.display = "block";
    }
}

function hideDeletionConfirmation(): void {
    const confirmation = document.getElementById("deletion-confirmation");
    if (confirmation) {
        confirmation.innerHTML = "";
    }
}


// Delete a client with confirmation
function deleteClient(clientID: string) : void {
    // Display a confirmation WITHOUT using the browser confirm() dialog
    clients = clients.filter(client => client.id !== clientID);
    displayClients();
    hideDeletionConfirmation();
}


// Display all clients
function displayClients(): void {
    const displayDiv = document.getElementById("client-display");
    if (displayDiv) {
        displayDiv.innerHTML = clients.map(client => formatClient(client)).join("");
    }
}

window.onload = () :void => {
    displayClients();
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
      <p>Is VIP: ${client.vip ? "Yes" : "No"}</p>
        <button onclick="switchToEditMode('${client.id}')">Edit</button>
        <button onclick="displayDeletionConfirmation('${client.id}')">Delete</button>
    </div>
  `;
}

// Populate the edit form
function populateEditForm(clientID: string): void {
    const client = clients.find(c => c.id === clientID);
    if (!client) {
        console.error("Client not found!");
        return;
    }
    // Switch to edit mode - make the id field read-only
    (document.getElementById("id") as HTMLInputElement).readOnly = true;
    // Populate form fields with client data
    (document.getElementById("id") as HTMLInputElement).value = client.id;
    (document.getElementById("name") as HTMLInputElement).value = client.name;
    (document.getElementById("dateOfBirth") as HTMLInputElement).value = client.dateOfBirth?.toISOString().split("T")[0] || "";
    (document.getElementById("gender") as HTMLSelectElement).value = client.gender;
    (document.getElementById("program") as HTMLSelectElement).value = client.program;
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
    const submitButton = document.getElementById("submit-button") as HTMLButtonElement;
    submitButton.textContent = "Update Client";
}

function disableEditMode(): void {
    // Clear the form fields
    const form = document.getElementById("client-form") as HTMLFormElement;
    form.reset();

    // Reset the form button label
    const submitButton = document.getElementById("submit-button") as HTMLButtonElement;
    submitButton.textContent = "Add Client";

    // Reset the id field to be editable
    (document.getElementById("id") as HTMLInputElement).readOnly = false;
}

