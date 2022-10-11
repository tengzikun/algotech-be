const router = require('express').Router();
const newsletterController = require('../controllers/newsletterController');

router.post('/', newsletterController.createNewsletter);
router.get('/all', newsletterController.getAllNewsletters);
router.get('/:id', newsletterController.getNewsletter);
router.post('/template', newsletterController.generateNewsletterHtml);
router.put('/', newsletterController.updateNewsletter);
router.delete('/:id', newsletterController.deleteNewsletter);

module.exports = router;
