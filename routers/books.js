const express = require('express');

const router = new express.Router();

router.get('/books', (req, res) => {
  res.render('index', { name: "Byron"});
});

module.exports = router;
