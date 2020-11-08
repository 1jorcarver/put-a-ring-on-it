const router = require('express').Router();

// const { route } = require('./user-routes.js');
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes')

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;