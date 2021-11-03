
//Class definition

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};

class UI{
    static showBooks(){
        const books = Data.bringBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href ="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static removeBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(()=>document.querySelector('.alert').remove(), 3000);
    }

    static cleanField(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
};


class Data{
    static bringBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Data.bringBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static deleteBookFromLocalStorage(isbn){
        const books = Data.bringBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
};


//Page load
document.addEventListener('DOMContentLoaded', UI.showBooks());


//Submit event
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    //Get field values

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please provide all the information needed.', 'danger');
    } else{
        const book = new Book(title, author, isbn);
        Data.addBook(book);
        UI.addBookToList(book);
        UI.showAlert('Book added to collection!', 'success')
        UI.cleanField();
    }
});

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.removeBook(e.target);
    Data.deleteBookFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book removed', 'success');
})