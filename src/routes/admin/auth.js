const express= require('express');
const router= express.Router();
const User= require('../../models/user');
const { signup, signin, signout } = require('../../controllers/admin/users');
const {validateRequestSignup, validateRequestSignin, isRequestValidated }= require('../../validators/auth');

router.post('/admin/signin',validateRequestSignin, isRequestValidated, signin)
router.post('/admin/signup', validateRequestSignup, isRequestValidated,  signup)
router.post('/admin/signout', signout);


module.exports= router;