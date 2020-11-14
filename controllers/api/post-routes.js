const router = require('express').Router();
const {Post, User} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const sendMessage = require('../../send_sms.js');

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
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err)
    });
});

router.post('/', withAuth, (req, res)=> {
    // need to code to establish user is logged in
    console.log(req.session);
    const textMessage = req.body.textMessage
    if (req.session)
        if (req.session.user_id) {
            Post.create ({
                title: req.body.title,
                eventdate: req.body.eventdatetime,
                comments: req.body.comments,
                user_id: req.session.user_id
            })
            
            .then(dbPostData =>{
                sendMessage(textMessage, eventdate, title);
                res.json(dbPostData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
        } else {
            res.status(403).end();
        }
        
    })

router.put(':/id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        eventdate: req.body.eventdate,
        comments: req.body.comments
    })
})

router.delete(':/id', withAuth, (req, res) => {
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

