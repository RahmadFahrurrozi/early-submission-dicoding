// app.js
const dummyData = [
  { title: "Note 1", body: "This is the body of note 1" },
  { title: "Note 2", body: "This is the body of note 2" },
  { title: "Note 3", body: "This is the body of note 3" },
];

document.addEventListener("DOMContentLoaded", () => {
  displayNotes(dummyData);
});

function displayNotes(notes) {
  const container = document.getElementById("notes-container");
  container.innerHTML = "";
  notes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.body}</p>
        `;
    container.appendChild(noteElement);
  });
}
class NoteElement extends HTMLElement {
  connectedCallback() {
    this.title = this.getAttribute("title");
    this.body = this.getAttribute("body");
    this.innerHTML = `
            <div class="note">
                <h2>${this.title}</h2>
                <p>${this.body}</p>
            </div>
        `;
  }
}

customElements.define("note-element", NoteElement);

// Update displayNotes function to use custom elements
function displayNotes(notes) {
  const container = document.getElementById("notes-container");
  container.innerHTML = "";
  notes.forEach((note) => {
    const noteElement = document.createElement("note-element");
    noteElement.setAttribute("title", note.title);
    noteElement.setAttribute("body", note.body);
    container.appendChild(noteElement);
  });
}

document
  .getElementById("note-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    if (title && body) {
      dummyData.push({ title, body });
      displayNotes(dummyData);
      this.reset();
    }
  });

document.getElementById("title").addEventListener("input", function () {
  if (this.value.length > 0) {
    this.style.borderColor = "green";
  } else {
    this.style.borderColor = "red";
  }
});

document.getElementById("body").addEventListener("input", function () {
  if (this.value.length > 0) {
    this.style.borderColor = "green";
  } else {
    this.style.borderColor = "red";
  }
});

class NoteElement extends HTMLElement {
  static get observedAttributes() {
    return ["title", "body"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this.title = newValue;
    } else if (name === "body") {
      this.body = newValue;
    }
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="note">
                <h2>${this.title}</h2>
                <p>${this.body}</p>
            </div>
        `;
  }
}

customElements.define("note-element", NoteElement);
