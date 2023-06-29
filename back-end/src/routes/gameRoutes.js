const { play, rank } = require('../controllers/gameController');

const router = require('express').Router();

router.get('/', play);
router.post('/', rank);

module.exports = router;
