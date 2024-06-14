const router = require("express").Router();
const { tweetList, tweetNew, tweetCreate, tweetDelete, tweetEdit, tweetUpdate } = require("../controllers/tweets.controller.js");

router.get('/', tweetList);
router.get('/tweet/new', tweetNew);
router.post('/', tweetCreate);
router.get("/edit/:tweetId", tweetEdit);
router.delete('/:tweetId', tweetDelete);
router.post('/update/:tweetId', tweetUpdate);


module.exports = router;