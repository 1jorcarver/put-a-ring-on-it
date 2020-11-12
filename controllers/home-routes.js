const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);
  res.render('homepage', {
    loggedIn: req.session.loggedIn
  });

});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'eventdate',
      'comments',
      'user_id'
    ],
    include: [
      {
        model: User,
        attributes: ['firstname']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('event-info', { 
        post,
        loggedIn: req.session.loggedIn
       });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return
  }
  res.render('login')
});

module.exports = router;