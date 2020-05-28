const express = require("express");
const extractFile = require('../middleware/multer');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const postsController = require('../controllers/posts');



router.get("/:id", postsController.getPost );

router.put("/:id", checkAuth, extractFile, postsController.updatePost );

router.post("", checkAuth, extractFile, postsController.createPost );

router.get("", postsController.getPosts );

router.delete("/:id", checkAuth,  postsController.deletePost );


module.exports = router;
