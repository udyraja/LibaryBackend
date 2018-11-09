const express= require ('express');
const router = express.Router();

const ResourceController = require('../controllers/projects');

router.get('/',ResourceController.projects_gell_all);

router.post('/',ResourceController.projects_add_new);

router.get('/:projectId',ResourceController.projects_get_projectById);

router.delete('/:projectId',ResourceController.projects_delete);


module.exports =router;