
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

    }

    static addBookToList(book){

    }

    static removeBook(){


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

    static deleteBook(isbn){

    }
};

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
        UI.cleanField();
    }
});