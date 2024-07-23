// /components/notelist.js
import { notesData } from "../data.js";

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .notes-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          padding: 20px;
        }

        .note-card {
          background: #fff;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }

        .note-card:hover {
          transform: scale(1.02);
        }

        .note-card h3 {
          margin-top: 0;
          font-size: 1.2rem;
          color: #00aaff;
        }

        .note-card p {
          font-size: 1rem;
          color: #555;
        }

        .note-card .date {
          font-size: 0.8rem;
          color: #ff9a9e;
          text-align: right;
        }

        @media (max-width: 321px) {
          .notes-container {
            grid-template-columns: 1fr;
          }
        }
      </style>
      <div class="notes-container">
        ${notesData
          .map(
            (note) => `
          <div class="note-card">
            <h3>${note.title}</h3>
            <p>${note.body}</p>
            <div class="date">${new Date(
              note.createdAt
            ).toLocaleDateString()}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }
}

customElements.define("note-list", NoteList);
