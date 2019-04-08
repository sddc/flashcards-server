const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('cards route');
});

module.exports = router;
