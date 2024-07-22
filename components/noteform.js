class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          padding: 20px;
          border-radius: 15px;
          background: #f5f5f5;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin: 0 20px;
        }

        .note-form, .calendar {
          padding: 20px;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .note-form h2, .calendar h2 {
          margin-bottom: 15px;
        }

        .note-form label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .note-form input, .note-form textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
          margin-bottom: 15px;
        }

        .note-form button-left {
          display: block;
          width: 100%;
          margin-top: 15px;
        }

        .calendar {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .calendar-header {
          display: flex;
          justify-content: center;
          margin-bottom: 15px;
        }

        .calendar-header select {
          padding: 5px;
          margin: 0 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          font-weight: bold;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }

        .calendar-grid div {
          padding: 10px;
          background: #f9f9f9;
          border-radius: 5px;
          text-align: center;
        }

        @media (max-width: 1024px) {
          .container {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .container {
            grid-template-columns: 1fr;
            padding: 10px;
          }

          .note-form, .calendar {
            padding: 15px;
          }

          .calendar-header {
            flex-direction: column;
          }

          .calendar-header select {
            margin: 5px 0;
          }

          .calendar-grid div {
            padding: 8px;
          }
        }

        @media (max-width: 480px) {
          .note-form input, .note-form textarea {
            padding: 8px;
          }

          .note-form button-left {
            font-size: 14px;
          }
        }

        @media (max-width: 320px) {
          .note-form h2, .calendar h2 {
            font-size: 18px;
          }

          .note-form input, .note-form textarea {
            padding: 6px;
          }

          .calendar-header select {
            padding: 5px;
          }

          .calendar-grid div {
            padding: 6px;
            font-size: 12px;
          }
        }
      </style>
      <div class="container">
        <div class="note-form">
          <h2>Buat Catatan</h2>
          <label for="title">Judul</label>
          <input type="text" id="title" name="title" required>
          <label for="content">Isi</label>
          <textarea id="content" name="content" rows="5" required></textarea>
          <button-left text="Simpan Catatan"></button-left> 
        </div>
        <div class="calendar">
          <h2>Kalender</h2>
          <div class="calendar-header">
            <select id="month-select"></select>
            <select id="year-select"></select>
          </div>
          <div class="calendar-grid"></div>
        </div>
      </div>
    `;

    this.months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    this.date = new Date();
    this.selectedMonth = this.date.getMonth();
    this.selectedYear = this.date.getFullYear();

    this.renderCalendar();
    this.attachEventListeners();
  }

  renderCalendar() {
    const monthSelect = this.shadowRoot.querySelector("#month-select");
    const yearSelect = this.shadowRoot.querySelector("#year-select");
    const calendarGrid = this.shadowRoot.querySelector(".calendar-grid");

    monthSelect.innerHTML = this.months
      .map(
        (month, index) => `
      <option value="${index}" ${
          index === this.selectedMonth ? "selected" : ""
        }>${month}</option>
    `
      )
      .join("");

    const currentYear = new Date().getFullYear();
    yearSelect.innerHTML = Array.from(
      { length: 10 },
      (_, i) => `
      <option value="${currentYear - 5 + i}" ${
        currentYear - 5 + i === this.selectedYear ? "selected" : ""
      }>${currentYear - 5 + i}</option>
    `
    ).join("");

    calendarGrid.innerHTML = "";

    const firstDay = new Date(
      this.selectedYear,
      this.selectedMonth,
      1
    ).getDay();
    const daysInMonth = new Date(
      this.selectedYear,
      this.selectedMonth + 1,
      0
    ).getDate();

    for (let i = 0; i < firstDay; i++) {
      calendarGrid.innerHTML += "<div></div>";
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === this.date.getDate() &&
        this.selectedMonth === this.date.getMonth() &&
        this.selectedYear === this.date.getFullYear();
      calendarGrid.innerHTML += `<div style="background: ${
        isToday ? "#00aaff" : "#f9f9f9"
      }">${i}</div>`;
    }
  }

  attachEventListeners() {
    const monthSelect = this.shadowRoot.querySelector("#month-select");
    const yearSelect = this.shadowRoot.querySelector("#year-select");

    monthSelect.addEventListener("change", (event) => {
      this.selectedMonth = parseInt(event.target.value);
      this.renderCalendar();
    });

    yearSelect.addEventListener("change", (event) => {
      this.selectedYear = parseInt(event.target.value);
      this.renderCalendar();
    });
  }
}

customElements.define("note-form", NoteForm);
