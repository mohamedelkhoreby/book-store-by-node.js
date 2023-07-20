var express = require('express');
var router = express.Router();
const Joi = require('joi');
//apply middlewares 
router.use(express.json());

const books = [
  {
    id:1,
    title:"black swan",
    author:" nasim taleb",
    description:"about black swan",
    price:"10 eg",
    cover:"soft cover"
  },
  {
    id:2,
    title:"black swan",
    author:" nasim taleb",
    description:"about black swan",
    price:"10 eg",
    cover:"soft cover"
  },
 ]
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});

router.get('/api/books', function(req, res, next) {
  res.render('book',{books : res.json(books)}
  );
});

router.get('/api/books/:id', function(req, res, next) {
  res.render('book');
const book = books.find(b => b.id == parseInt(req.params.id ))

if(book){
  res.status(200).json(books);
}else{
  res.status(404).json({mesasage: "book not found"});
}
});

router.post('/api/books/post',function(req,res){
  const schema =Joi.object({
    title:Joi.string().min(3).max(200).required(),
    author:Joi.string().min(3).max(200).required(),
    description:Joi.string().min(500).max(30).required(),
    price:Joi.number().min(3).max(9).required(),
    cover:Joi.string().min(3).max(9).required(),
  })
  const{error}= schema.validate(req.body);
  
  if(error){
    return res.status(400).json({mesasage:error.details[0].message})
  }
  
  const book = {
  id: books.length + 1 ,
  title: req.body.title,
  author: req.body.author,
  description:req.body.description,
  price: req.body.price,
  cover : req.body.cover,
} 
books.push(book);
res.status(201).json(book);
res.render('book')
});
router.post('/api/books/post',function(req,res){
})
module.exports = router;
