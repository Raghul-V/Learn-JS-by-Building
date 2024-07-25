class Note {
    constructor (title, content) {
        this.title = title;
        this.content = content;
    }

    addNote(target) {
        const noteElem = document.createElement("div");
        noteElem.classList.add("note");
        const heading = document.createElement("h2");
        heading.innerHTML = this.title;
        const body = document.createElement("p");
        body.innerHTML = this.content;
        const delBtn = document.createElement("button");
        delBtn.classList.add("del-btn");
        delBtn.innerHTML = "Delete";
        delBtn.addEventListener("click", () => {
            target.removeChild(noteElem);
        });
        noteElem.appendChild(heading);
        noteElem.appendChild(body);
        noteElem.appendChild(delBtn);
        target.appendChild(noteElem);
    }
}

const newNote = document.querySelector(".new-note");
newNote.addEventListener("click", () => {
    if (document.querySelector(".prev-note")) {
        newNote.innerHTML = `
            <input type="text" class="heading" placeholder="Title">
            <input type="text" class="content" autofocus placeholder="Take a note...">
            <button class="add-btn">Add</button>
        `;
        const addBtn = document.querySelector(".add-btn");
        addBtn.addEventListener("click", (e) => {
            const titleText = document.querySelector(".heading");
            const contentText = document.querySelector(".content");
            if (titleText.value.trim() || contentText.value.trim()) {
                const note = new Note(titleText.value, contentText.value);
                note.addNote(document.querySelector(".notes"));
                titleText.value = "";
                contentText.value = "";
            }
        });
    }
});

document.addEventListener("click", (e) => {
    if (!(e.path.includes(newNote))) {
        newNote.innerHTML = `
            <input type="text" class="prev-note" placeholder="Take a note...">
        `;
    }
})


