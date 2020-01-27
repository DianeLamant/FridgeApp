// VALIDATION
const Joi = require('@hapi/joi');

// REGISTER VALIDATION
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data)
}

// LOGIN VALIDATION
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data)
}

// NAME VALIDATION
const nameValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    })
    return schema.validate(data)
}

// EMAIL VALIDATION
const emailValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
    })
    return schema.validate(data)
}

// PASSWORD VALIDATION
const passwordValidation = data => {
    const schema = Joi.object({
        password: Joi.string().min(8).required()
    })
    return schema.validate(data)
}

module.exports = {
    registerValidation: registerValidation,
    loginValidation: loginValidation,
    nameValidation: nameValidation,
    emailValidation: emailValidation, 
    passwordValidation: passwordValidation
};
