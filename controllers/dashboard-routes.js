const router = require('express').Router()
const sequelize = require('../config/connection');
const { Post, User} = require('./../models');
// const router = require('./api/user-routes');

router.get('/', (req, res)=>{
    console.log(req.session.sid)
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes:
            ["title","eventdate","comments"],
        include: [{
            model: User,
            attributes: ['id','firstname','lastname']
        }]
    })
    .then(dbPostdata => {
        const posts = dbPostdata.map(post=>post.get({plain:true}));
        console.log(posts);
        res.render('dashboard', {
            posts,
            firstname: req.session.firstname
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

router.get('/edit/:id', (req, res) => {
    Post.findOne({
        where: {id:req.params.id},
        attributes: [
            'id','title','eventdate','comments'
        ]
    })
    .then(dbPostData=> {
        if(!dbPostData){
            res.status(404).json({message: 'Post not found with that id'});
            return
        }
        const post = dbPostData.get({plain:true})
        res.render('edit-post', {post, loggedIn: true})
    })
    .catch(err=>{
        res.status(500).json(err)
    });
})
 

module.exports = router