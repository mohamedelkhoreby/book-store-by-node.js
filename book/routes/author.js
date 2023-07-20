var express = require('express');
var router = express.Router();
const Joi = require('joi');
//apply middlewares 
router.use(express.json());

const authors = [
    {
      id: 1,
      firstname: "nageb ",
      lastname: "mahfoz",
      nationality: "egyption",
      image: "defualt-image.png"
    },
  ];
  
/** 
* @desc GET all author
* @route /author
* @method GET
* @access public
*/
router.get('/author', function (req, res, next) {
    res.render('book', { books: res.json(authors) }
    );
  });
  
  /** 
  * @desc get spacific author by id
  * @route /author/:id
  * @method GET
  * @access public
  */
  router.get('/author:id', function (req, res, next) {
    res.render('author');
    const author = books.find(b => b.id == parseInt(req.params.id));
    if (author) {
      res.status(200).json(authors);
    } else {
      res.status(404).json({ mesasage: "author not found" });
    }
  });
  /** 
  * @desc create book
  * @route /api/books/post
  * @method post
  * @access public
  */
  router.post('/author/post', function (req, res, next) {
    const { error } = validatenCreateBook(req.body);
    if (error) {
      return res.status(400).json({ mesasage: error.details[0].message });
    };
    const author = {
      id: authors.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      nationality: req.body.nationality,
      image: req.body.image,
    };
    authors.push(author);
    res.status(201).json(author); //201 created successfuly
    res.render('author')
  });
  
  // validaten Create author // 
  function validatenCreateAuthor(obj) {
    const schema = Joi.object({
      firstname: Joi.string().min(3).max(200).required(),
      lastname: Joi.string().min(3).max(30).required(),
      nationality: Joi.number().min(3).max(9).required(),
      image: Joi.string().min(3).max(9).required(),
    });
    return schema.validate(obj);
  }
  
  /** 
  * @desc updata a author
  * @route /author/
  * @method put
  * @access public
  */
  router.put("/:id", function (req, res, next) {
    const { error } = validatenCreateAuthor(req.body);
    if (error) {
      return res.status(400).json({ mesasage: error.details[0].message });
    }
    const book = authors.find(b => b.id == parseInt(req.params.id));
    if (author) {
      res.status(200).json({ mesasage: "author has been updated" });
    } else {
      res.status(404).json({ mesasage: "author not found" });
    }
  });
  
  /** 
  * @desc delete a author
  * @route /author/
  * @method delete
  * @access public
  */
  router.delete("/:id", function (req, res, next) {
    const { error } = validatenCreateAuthor(req.body);
    if (error) {
      return res.status(400).json({ mesasage: error.details[0].message });
    }
    const author = authors.find(b => b.id == parseInt(req.params.id));
    if (author) {
      res.status(200).json({ mesasage: "author has been deleted" });
    } else {
      res.status(404).json({ mesasage: "author not found" });
    }
  });
  module.exports = router;
  

  