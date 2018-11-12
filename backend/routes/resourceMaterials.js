const express= require ('express');
const router = express.Router();

const ResourceController = require('../controllers/resourceMaterials');

router.get('/',ResourceController.resource_list);

router.get('/:resourceId',ResourceController.resource_detail);

router.post('/',ResourceController.resource_create_post);

router.delete('/:resourceId',ResourceController.resource_delete_post);


module.exports =router;