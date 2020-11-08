const router = require('express').Router;
const {Post, User} = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res)=> {
    Post.findAll ({
        attributes:[
            'id',
            'title',
            'eventdate',
            'comments'
        ],
        order: [['created_at', 'DESC']],
        include: {
            model: User,
            attributes:['firstname','lastname']
        }
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err)
    });
})

router.get(':/id', (req, res)=>{

})

router.post('/', (req, res)=> {

})

router.put(':/id', (req, res) => {

})

