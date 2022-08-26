const exp=require('express');
const router=exp.Router();
const usercontroller=require('../controllers/userController');

// create,find,update,delete
router.get('/',usercontroller.view);
router.post('/',usercontroller.find);
router.get('/adduser',usercontroller.user);
router.post('/adduser',usercontroller.form);
router.get('/edituser/:id',usercontroller.edit);
router.post('/edituser/:id',usercontroller.update);
router.get('/:id',usercontroller.delete);
router.get('/viewuser/:id',usercontroller.see);
module.exports=router;