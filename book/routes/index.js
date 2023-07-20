var express = require('express');
var router = express.Router();
const Joi = require('joi');
//apply middlewares 
router.use(express.json());

const books = [
  {
    id: 1,
    title: "black swan",
    author: " nasim taleb",
    description: "about black swan",
    price: "10 eg",
    cover: "soft cover"
  },
  {
    id: 2,
    title: "black swan",
    author: " nasim taleb",
    description: "about black swan",
    price: "10 eg",
    cover: "soft cover"
  },
]

/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });

});

/** 
* @desc get all books
* @route /api/books/
* @method GET
* @access public
*/
router.get('/api/books', function (req, res, next) {
  res.render('book', { books: res.json(books) }
  );
});

/** 
* @desc get spacific book by id
* @route /api/books/:id
* @method GET
* @access public
*/
router.get('/api/books/:id', function (req, res, next) {
  res.render('book');
  const book = books.find(b => b.id == parseInt(req.params.id));
  if (book) {
    res.status(200).json(books);
  } else {
    res.status(404).json({ mesasage: "book not found" });
  }
});
/** 
* @desc create book
* @route /api/books/post
* @method post
* @access public
*/
router.post('/api/books/post', function (req, res, next) {
  const { error } = validatenCreateBook(req.body);
  if (error) {
    return res.status(400).json({ mesasage: error.details[0].message });
  };
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };
  books.push(book);
  res.status(201).json(book); //201 created successfuly
  res.render('book')
});

// validaten Create book // 
function validatenCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    author: Joi.string().min(3).max(200).required(),
    description: Joi.string().min(500).max(30).required(),
    price: Joi.number().min(3).max(9).required(),
    cover: Joi.string().min(3).max(9).required(),
  });
  return schema.validate(obj);
}

/** 
* @desc updata a book
* @route /api/books/
* @method put
* @access public
*/
router.put("/:id", function (req, res, next) {
  const { error } = validatenCreateBook(req.body);
  if (error) {
    return res.status(400).json({ mesasage: error.details[0].message });
  }
  const book = books.find(b => b.id == parseInt(req.params.id));
  if (book) {
    res.status(200).json({ mesasage: "book has been updated" });
  } else {
    res.status(404).json({ mesasage: "book not found" });
  }
});

/** 
* @desc delete a book
* @route /api/books/
* @method delete
* @access public
*/
router.delete("/:id", function (req, res, next) {
  const { error } = validatenCreateBook(req.body);
  if (error) {
    return res.status(400).json({ mesasage: error.details[0].message });
  }
  const book = books.find(b => b.id == parseInt(req.params.id));
  if (book) {
    res.status(200).json({ mesasage: "book has been deleted" });
  } else {
    res.status(404).json({ mesasage: "book not found" });
  }
});
module.exports = router;
