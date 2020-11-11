const router = require('express').Router();
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
        include: [
        {
            model: User,
            attributes:['firstname','lastname']
        }
      ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err)
    });
})

router.get(':/id', (req, res)=>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes:[
            'id',
            'title',
            'eventdate',
            'comments'
        ],
        order: [['created_at', 'DESC']],
    //     include: [
    //     {
    //         model: User,
    //         attributes:['user_id','firstname','lastname']
    //     }
    //   ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err)
    });
});

router.post('/', (req, res)=> {
    // need to code to establish user is logged in
    console.log(req.session);
    if (req.session)
    // if (req.body.dev) {
    //     Post.create ({
    //         title: req.body.title,
    //         eventdate: req.body.eventdate,
    //         comments: req.body.comments,
    //         user_id: req.body.user_id
    //     })
    //     .then(dbPostData =>res.json(dbPostData))
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json(err)
    //     })
    // } else {
        if (req.session.user_id) {
            Post.create ({
                title: req.body.title,
                eventdate: req.body.eventdate,
                comments: req.body.comments,
                user_id: req.session.user_id
            })
            .then(dbPostData =>res.json(dbPostData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
        } else {
            res.status(403).end();
        }
        
    })

router.put(':/id', (req, res) => {
    Post.update({
        title: req.body.title,
        eventdate: req.body.eventdate,
        comments: req.body.comments
    })
})
router.delete(':/id', (req, res) => {
    Post.destroy({
        where: {
        id:req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message:'Cannot find a post with this id'})
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;

