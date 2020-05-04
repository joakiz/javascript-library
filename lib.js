let myLibrary = [];
myLibrary.push(new Book("Lord of the rings", "JRR Tolkien", 300, true));
renderLib();



//constructor for book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return '${title} + ${author} + ${pages} + ${read}';
    }
}

function addBook() {
    document.getElementById("formCover").setAttribute("hidden", true);
    let bookInfo = document.querySelectorAll("#newBookEntry input[placeholder");
    myLibrary.push(new Book(bookInfo[0].value, bookInfo[1].value, bookInfo[2].value, false));
    bookInfo.forEach(i => i.value = ""); // reset all fields in form

    console.log(myLibrary);
    renderLib();
}

function removeBook(Book) {
    myLibrary.splice(Book, 1);
    renderLib();
}

function showForm() {
    document.getElementById("formCover").removeAttribute("hidden");
}

function closeForm() {
    document.getElementById("formCover").setAttribute("hidden", true);

}

//listeners for form buttons to add books
document.getElementById("newBook").addEventListener("click", showForm);
document.getElementById("cancel").addEventListener("click", closeForm);
document.getElementById("submit").addEventListener("click", addBook);


function renderLib() {
    let libDisplay = document.getElementById("library");
    libDisplay.innerHTML = "";
    myLibrary.forEach((value, i) => {
        let libNode = document.createElement("div"); // create boook divs
        libNode.setAttribute("data-index", i);
        libNode.setAttribute("class", "book");
        if (value.read) {
            libNode.classList.add("read");
        }
        //add remove and read buttons to bookcard
            libNode.innerHTML = `<button id="removeButton" class="cardBtn">delete &#10060</button><button id="readBtn" class="cardBtn">Read &#9989</button><br><br>${value.title} <p>Author: ${value.author}<br> Pages: ${value.pages} </p>`;
            libDisplay.appendChild(libNode);
        
    });

    document.querySelectorAll("#removeButton").forEach(btn => btn.addEventListener("click", function () {
        removeBook(btn.parentElement.getAttribute("data-index"));
    }));

    document.querySelectorAll("#readBtn").forEach(btn => btn.addEventListener("click", function () {
        if (myLibrary[btn.parentElement.getAttribute("data-index")].read) {
            myLibrary[btn.parentElement.getAttribute("data-index")].read = false;
        } else {
            myLibrary[btn.parentElement.getAttribute("data-index")].read = true;
        }

        renderLib();
    }));
}


