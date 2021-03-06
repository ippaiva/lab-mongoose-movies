const express = require('express');

const router = express.Router();
const Celebrity = require('../models/celebrity.js');

/* GET home page */
router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebrity) => {
      res.render('celebrities/index', {
        title: 'Celebrity Inventory',
        celebrity
      });
    })
    .catch((error) => {
      console.log(error);
    });
});


// NEW
router.get('/new', (req, res, next) => {
  res.render('celebrities/new', {
    title: "New Celebrity's Profile"
  });
});


router.post('/new', (req, res, next) => {
  const newCelebrity = new Celebrity({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  });
    newCelebrity.save((err) => {
    if (err) {
      res.render('celebrities/new', {
        title: "New Celebrity's Profile"
      });
    } else {
      res.redirect('/');
    }
  });
});

// ____________________________________________

// EDIT - NOT WORKING ~ ???
router.post('/:id', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.update({ _id: req.query.celebrity_id }, { $set: { name, occupation, catchPhrase } })
    .then(() => {
      res.redirect('/celebrities/');
    })
    .catch((error) => {
      console.log(error);
    });
});


// SHOW
router.get('/:id', (req, res, next) => {
  Celebrity.findOne({ _id: req.params.id })
    .then((celebrity) => {
      res.render('celebrities/show', { title: 'Show Details', celebrity });
    })
    .catch((error) => {
      console.log(error);
    });
});


module.exports = router;
