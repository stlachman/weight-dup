const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

const { catchErrors } = require('../handlers/errorHandlers');


router.get('/', programController.homePage);
router.get('/programs', programController.getPrograms);

router.get('/program', programController.addProgram);
router.post('/program', catchErrors(programController.createProgram));
router.post('/program/:id', catchErrors(programController.updateProgram));

router.get('/program/:slug', catchErrors(programController.getProgramBySlug));

router.get('/programs/:id/edit', catchErrors(programController.editProgram));

module.exports = router;
