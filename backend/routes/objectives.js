const express= require ('express');
const router = express.Router();

const ObjectiveController = require('../controllers/objectives');
/*
router.get('/',ResourceController.resource_list);

router.get('/:resourceId',ResourceController.resource_detail);
*/

router.post('/',ObjectiveController.objective_create_post);

/*router.delete('/:resourceId',ResourceController.projects_delete);*/


module.exports =router;