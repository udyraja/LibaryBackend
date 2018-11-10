const express= require ('express');
const router = express.Router();

const ProjectController = require('../controllers/projects');

router.get('/',ProjectController.projects_get_all);

router.post('/',ProjectController.projects_add_new);

router.get('/:projectId',ProjectController.projects_get_projectById);

router.delete('/:projectId',ProjectController.projects_delete);

module.exports =router;


