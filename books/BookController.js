require('dotenv').config();
const fetch = require('node-fetch');
const BookModel = require('./BookModel');

const BookController = {};

// This controller creates a book in the book db
BookController.createBook = (req, res, next) => {
  const { title, author, numberOfPages, publisher } = req.body;
  BookModel.create(
    {
      title,
      author,
      numberOfPages,
      publisher,
    },
    (err, result) => {
      if (err) {
        console.log(`Error: ${err}`);
        return res.send(404).json(err);
      }

      res.locals.createBook = result;
      return next();
    }
  );
};

// This controller creates a book in the book db

BookController.getBooks = (req, res, next) => {
  BookModel.find({}, (err, result) => {
    if (err) {
      console.log('Book retrieval was not successful', err);
      return res.status(404).json(err);
    }
    res.locals.getBooks = result;
    // console.log('Book retrieval was successful', res.locals.getBooks);
    return next();
  });
};

// This controller deletes books
BookController.deleteBook = (req, res, next) => {
  const { id } = req.query;
  BookModel.findOneAndDelete({ _id: id }, (error, result) => {
    if (error) {
      console.log(`Deletion was not successful ${error}`);
      return res.status(404).json(error);
    }
    res.locals.deleteBook = result;
    return next();
  });
};

//  This controller gets order info from the order application
BookController.getorderinfo = (req, res, next) => {
  // console.log('req.headers (in bookController.js):', req.headers);
  fetch(`http://orders:7777/orders/getorders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'Application/JSON',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((results) => {
      res.locals.getorderinfo = results;
      return next();
    })
    .catch((error) => {
      console.log(`There was an error in getting orders data ${error}`);
    });
};
module.exports = BookController;
