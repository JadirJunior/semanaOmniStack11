const {celebrate, Segments, Joi} = require('celebrate');

const validator = {
   CreateOngs: celebrate({
       [Segments.BODY]: Joi.object().keys({
           name: Joi.string().required(),
           email: Joi.string().email().required(),
           whatsapp: Joi.string().required().min(10).max(11),
           city: Joi.string().required(),
           uf: Joi.string().length(2)
       })
   }),

   DeleteIncident: celebrate({
       [Segments.PARAMS]: Joi.object().keys({
           id: Joi.number().required()
       })
   }),

   ListIncident: celebrate({
       [Segments.QUERY]: Joi.object().keys({
           page: Joi.number()
       }) 
   }),

   getProfile: celebrate({
       [Segments.HEADERS]: Joi.object({
           authorization: Joi.string().required()
       }).unknown()
   }),

   validationLogon: celebrate({
       [Segments.BODY]: Joi.object().keys({
           id: Joi.string().required().length(8)    
       })
   }),

   createIncident: celebrate({
       [Segments.BODY]: Joi.object().keys({
           title: Joi.string().required(),
           description: Joi.string().required(),
           value: Joi.number().required()
       }),

       [Segments.HEADERS]: Joi.object({
           authorization: Joi.string().required(),
       }).unknown()
   })
};

module.exports = validator;