let myLibrary = [];

//load up any previous library  from localstorage and render
loadLocal();
renderLib();

//constructor for book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

function saveLocal() {
    localStorage.setItem('books', JSON.stringify(myLibrary));
}

function loadLocal() {
    let loadLibrary = JSON.parse(localStorage.getItem('books'))
    if (!loadLibrary === null || !loadLibrary === undefined || !loadLibrary.length == 0) {
        myLibrary = loadLibrary;
    }

}


function addBook(book) {
    myLibrary.push(book);
    saveLocal()
    //console.log(myLibrary);
    renderLib();
}

function removeBook(index) {
    index.innerHTML = ''
    myLibrary.splice(index, 1);
    renderLib();
}
//listenr for opening modal to add new book
const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('#newBook');
modalBtn.addEventListener('click', openModal);

function openModal() {
    modal.style.display = 'block';
}

const closeBtn = document.querySelector('.closeModal');
closeBtn.addEventListener('click', closeModal);

function closeModal() {
    modal.style.display = 'none';
    modalForm.reset();
}

//close the modal by clicking outside the modal frame
window.addEventListener('click', outsideClick);
function outsideClick(e) {
    if (e.target == modal) {
        closeModal();
    }
}

const modalForm = document.querySelector('.modal-form');
const submitBtn = document.querySelector('.modal-submit-button');
submitBtn.addEventListener('click', submitModal);

function submitModal() {
    let author = document.querySelector('.form-author-name').value;
    let title = document.querySelector('.form-title').value;
    let numPages = document.querySelector('.form-pages').value;
    let read = document.querySelector('.form-read').checked;
    let bookToAdd = new Book(author, title, numPages, read);
    if (author == '' || title == '' || numPages == '') { //check if fields are filled in
        alert('Fill empty fields to add a new book!');
        return false;
    }
    if (isNaN(numPages)) {
        alert('Enter a number');
        return false;
    }
    modalForm.reset();
    addBook(bookToAdd);
    renderLib();
    closeModal();
}

function renderLib() {
    let libDisplay = document.getElementById("library");
    libDisplay.innerHTML = "";

    //save the changes to library
    saveLocal();

    //for each book in the library, create divs with and bookcards with bookinfo
    myLibrary.forEach((value, i) => {
        let libNode = document.createElement("div");
        libNode.setAttribute("data-index", i);
        libNode.setAttribute("class", "book");
        if (value.read) {
            libNode.classList.add("read");
        }
        //add remove and read buttons to bookcard
        libNode.innerHTML = `<button id="removeButton" class="cardBtn">Delete &#10060</button><button id="readBtn" class="cardBtn">Read &#9989</button><br><br>${value.title} <p>Author: ${value.author}<br> Pages: ${value.pages} </p>`;
        libDisplay.appendChild(libNode);

    });

    //add eventlisteners for read toggle and removebuttons
    document.querySelectorAll("#removeButton").forEach(btn => btn.addEventListener("click", function () {
        removeBook(btn.parentElement.getAttribute("data-index"));
    }));

    document.querySelectorAll("#readBtn").forEach(btn => btn.addEventListener("click", function () {
        if (myLibrary[btn.parentElement.getAttribute("data-index")].read) {
            myLibrary[btn.parentElement.getAttribute("data-index")].read = false;
            saveLocal();

        } else {
            myLibrary[btn.parentElement.getAttribute("data-index")].read = true;


        }

        renderLib();
    }));
}


