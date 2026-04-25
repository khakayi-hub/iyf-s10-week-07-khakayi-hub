const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

// Load notes when page opens
document.addEventListener("DOMContentLoaded", loadNotes);

// Add note
addNoteBtn.addEventListener("click", () => {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please write a note first!");
        return;
    }

    const notes = getNotes();
    notes.push(noteText);

    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";
    displayNotes();
});

// Get notes from localStorage
function getNotes() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
}

// Display notes
function displayNotes() {
    notesContainer.innerHTML = "";

    const notes = getNotes();

    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        noteDiv.innerHTML = `
            <span>${note}</span>
            <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        `;

        notesContainer.appendChild(noteDiv);
    });
}

// Delete note
function deleteNote(index) {
    const notes = getNotes();

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
}

// Load saved notes
function loadNotes() {
    displayNotes();
}