const { check, validationResult }= require('express-validator');

exports.validateRequestSignup = [
    check('firstName')
    .notEmpty()
    .withMessage('first name is required'),
    check('lastName')
    .notEmpty()
    .withMessage('last name is required'),
    check('email')
    .isEmail()
    .withMessage('valid email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be atleast 6 characters long')
    

];

exports.validateRequestSignin=[
    check('email')
    .isEmail()
    .withMessage('valid email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be atleast 6 characters long')

];

exports.isRequestValidated= (req, res, next) =>{

    const errors= validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    next();
    
    
}