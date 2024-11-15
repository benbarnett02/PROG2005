"use strict";
class Client {
    id; // Using a string - we're never going to do math on it so why constrain ourselves to a number?
    name;
    gender;
    dateOfBirth;
    program;
    _email;
    _phoneNumber;
    startDate;
    endDate;
    notes;
    vip = false;
    get email() {
        return this._email;
    }
    set email(value) {
        if (value.length > 0 && value.indexOf("@") > 0) {
            this._email = value;
        }
        else {
            throw new Error("Invalid email address");
        }
    }
    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(value) {
        if (value.length == 10 && value.indexOf("04") == 0) { // Maybe we only want Australian numbers & no country code (start with 04)
            this._phoneNumber = value;
        }
        else {
            throw new Error("Invalid phone number");
        }
    }
    constructor(id, name, gender, dateOfBirth, program, email, phoneNumber, startDate, endDate, notes) {
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
var enumGender;
(function (enumGender) {
    enumGender["unspecified"] = "Unspecified";
    enumGender["female"] = "Female";
    enumGender["male"] = "Male";
})(enumGender || (enumGender = {}));
var enumProgram;
(function (enumProgram) {
    enumProgram["unspecified"] = "Unspecified";
    enumProgram["FatLoss"] = "Fat Loss";
    enumProgram["Senior"] = "Senior Fitness";
    enumProgram["Muscle"] = "Muscle Gain";
    enumProgram["Natal"] = "Pre/Post Natal Fitness";
    enumProgram["Contest"] = "Contest Preparation";
    enumProgram["General"] = "Overall Fitness";
})(enumProgram || (enumProgram = {}));
let clients = [
    // Optional initial data
    new Client("1", "Alice", enumGender.female, new Date(1990, 1, 1), enumProgram.FatLoss, "test@example.com", "0404999888", new Date(2024, 1, 1), new Date(2025, 1, 1), ""),
];
// Add a new client
function addClient(client) {
    if (clients.some(existingClient => existingClient.id === client.id)) {
        return "Error: Client ID must be unique.";
    }
    clients.push(client);
    displayClients();
    return "Client added successfully!";
}
// On submit button click
function submitClientForm() {
    if (editingClientID) {
        // Update existing client
        const updatedClient = getClientFromForm(); // Client from form function goes here
        updateClient(editingClientID, updatedClient);
    }
    else {
        // Add new client
        const newClient = getClientFromForm(); // Client from form function goes here
        addClient(newClient);
    }
}
function getClientFromForm() {
    return new Client(document.getElementById("id").value, document.getElementById("name").value, document.getElementById("gender").value, new Date(document.getElementById("dateOfBirth").value), document.getElementById("program").value, document.getElementById("email").value, document.getElementById("phoneNumber").value, new Date(document.getElementById("startDate").value), new Date(document.getElementById("endDate").value), document.getElementById("notes").value);
}
// Update an existing client
function updateClient(clientID, updatedInfo) {
    const client = clients.find(c => c.id === clientID);
    if (!client)
        return "Error: Client not found.";
    Object.assign(client, updatedInfo); // Merge updated info into client
    displayClients();
    return "Client updated successfully!";
}
// Delete a client with confirmation
function deleteClient(clientID) {
    if (confirm(`Are you sure you want to delete client with ID ${clientID}?`)) {
        clients = clients.filter(client => client.id !== clientID);
        displayClients();
        return "Client deleted successfully!";
    }
    return "Action canceled.";
}
// Search for a client by ID
function searchClient(clientID) {
    return clients.find(client => client.id === clientID);
}
// Display all clients
function displayClients() {
    const displayDiv = document.getElementById("client-display");
    if (displayDiv) {
        displayDiv.innerHTML = clients.map(client => formatClient(client)).join("");
    }
}
window.onload = () => {
    displayClients();
    displayVIPClients();
};
// Display all VIP clients
function displayVIPClients() {
    const vipClients = clients.filter(client => client.vip);
    const displayDiv = document.getElementById("vip-client-display");
    if (displayDiv) {
        displayDiv.innerHTML = vipClients.map(client => formatClient(client)).join("");
    }
}
// Helper to format client data for display
function formatClient(client) {
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
function addClientFromForm() {
    const clientID = document.getElementById("id").value;
    // Other form values...
    const newClient = new Client(clientID, "Alice", enumGender.female, new Date(1990, 1, 1), enumProgram.FatLoss, "test@example.com", "0404999888", new Date(2024, 1, 1), new Date(2025, 1, 1), "");
    let action = addClient(newClient);
}
// Populate the edit form
function populateEditForm(clientID) {
    const client = clients.find(c => c.id === clientID);
    if (!client) {
        console.error("Client not found!");
        return;
    }
    // Switch to edit mode - make the id field read-only
    document.getElementById("clientID").readOnly = true;
    // Populate form fields with client data
    document.getElementById("clientID").value = client.id;
    document.getElementById("name").value = client.name;
    document.getElementById("dateOfBirth").value = client.dateOfBirth?.toISOString().split("T")[0] || "";
    document.getElementById("gender").value = client.gender;
    document.getElementById("fitnessProgram").value = client.program;
    document.getElementById("email").value = client.email;
    document.getElementById("phoneNumber").value = client.phoneNumber;
    document.getElementById("startDate").value = client.startDate?.toISOString().split("T")[0] || "";
    document.getElementById("endDate").value = client.endDate?.toISOString().split("T")[0] || "";
    document.getElementById("notes").value = client.notes || "";
}
let editingClientID = null; // Keeps track of the client being edited
function switchToEditMode(clientID) {
    populateEditForm(clientID); // Fill the form with existing data
    editingClientID = clientID; // Set the client being edited
    // Update the form button label
    const submitButton = document.getElementById("form-submit-button");
    submitButton.textContent = "Update Client";
}
