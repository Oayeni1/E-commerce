const Joi=require('joi')

module.exports.userValidation= (data)=>{
    const Schema=Joi.object({
        name:Joi.string()
        .required(),
        email:Joi.string()
        .email()
        .required(),
        password:Joi.string()
        .required()
        .min(6),
        confirm_password:Joi.ref("password")
        
    })
    return Schema.validate(data)
}

module.exports.productVAlidatiion=(data)=>{

    const schema=Joi.object({
        name:Joi.string()
        .required(),

        pricePerUnit:Joi.number()
        .required()
        .positive()
        .messages({
            'number.base': `This field can only take number`,
            'number.positive': `It must be a positive number`,
            'any.required': `Price is required`
        }),
        category:Joi.string()
        .required()
        
    })
    return schema.validate(data)
}

