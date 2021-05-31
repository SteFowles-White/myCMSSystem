const express = require('express');
const admin = require('../controller/admin');
const router = express.Router();



/* GET users listing. */
router.get('/', admin.adminHomePage);
router.get('/create-page', admin.adminCreatePage);
router.post('/create-page', admin.postCreatePage);

// This is the create element routes
router.get('/create-element', admin.getAdminElementPage);
router.post('/create-element', admin.postAdminCreateElementPage);
router.post('/delete-element', admin.postDeleteElementPage);
router.post('/edit-element', admin.postEditElement);

module.exports = router;
