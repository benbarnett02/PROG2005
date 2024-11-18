"use strict";
class Client {
    id; // Using a string - we're never going to do math on it so why constrain ourselves to a number?
    name;
    gender;
    dateOfBirth;
    program;
    startDate;
    endDate;
    notes;
    vip = false;
    _email;
    _phoneNumber;
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
        this._phoneNumber = value;
        // was going to do validation here but it's not required & clunky.
    }
    constructor(id, name, gender, dateOfBirth, program, email, phoneNumber, startDate, endDate, notes, vip) {
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
    new Client("1", "Alice", enumGender.female, new Date(1990, 1, 1), enumProgram.FatLoss, "test@example.com", "0404999888", new Date(2024, 1, 1), new Date(2025, 1, 1), "", false),
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
        updateClient(editingClientID, getClientFromForm());
        editingClientID = null;
        disableEditMode();
    }
    else {
        addClient(getClientFromForm());
    }
}
function getClientFromForm() {
    return new Client(document.getElementById("id").value, document.getElementById("name").value, document.getElementById("gender").value, new Date(document.getElementById("dateOfBirth").value), document.getElementById("program").value, document.getElementById("email").value, document.getElementById("phoneNumber").value, new Date(document.getElementById("startDate").value), new Date(document.getElementById("endDate").value), document.getElementById("notes").value, document.getElementById("vip").checked);
}
// Update an existing client
function updateClient(clientID, updatedInfo) {
    const client = clients.find(c => c.id === clientID);
    if (!client)
        return "Error: Client not found.";
    Object.assign(client, updatedInfo); // Merge updated info into client
    displayClients();
    editingClientID = null; // Reset editing mode
    return "Client updated successfully!";
}
function displayDeletionConfirmation(clientID) {
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
function hideDeletionConfirmation() {
    const confirmation = document.getElementById("deletion-confirmation");
    if (confirmation) {
        confirmation.innerHTML = "";
    }
}
// Delete a client with confirmation
function deleteClient(clientID) {
    // Display a confirmation WITHOUT using the browser confirm() dialog
    clients = clients.filter(client => client.id !== clientID);
    displayClients();
    hideDeletionConfirmation();
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
      <p>Is VIP: ${client.vip ? "Yes" : "No"}</p>
        <button onclick="switchToEditMode('${client.id}')">Edit</button>
        <button onclick="displayDeletionConfirmation('${client.id}')">Delete</button>
    </div>
  `;
}
// Populate the edit form
function populateEditForm(clientID) {
    const client = clients.find(c => c.id === clientID);
    if (!client) {
        console.error("Client not found!");
        return;
    }
    // Switch to edit mode - make the id field read-only
    document.getElementById("id").readOnly = true;
    // Populate form fields with client data
    document.getElementById("id").value = client.id;
    document.getElementById("name").value = client.name;
    document.getElementById("dateOfBirth").value = client.dateOfBirth?.toISOString().split("T")[0] || "";
    document.getElementById("gender").value = client.gender;
    document.getElementById("program").value = client.program;
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
    const submitButton = document.getElementById("submit-button");
    submitButton.textContent = "Update Client";
}
function disableEditMode() {
    // Clear the form fields
    const form = document.getElementById("client-form");
    form.reset();
    // Reset the form button label
    const submitButton = document.getElementById("submit-button");
    submitButton.textContent = "Add Client";
    // Reset the id field to be editable
    document.getElementById("id").readOnly = false;
}
