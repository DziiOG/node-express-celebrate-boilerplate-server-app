/**
 * Order Validations. Defining order validations schema using celebrate
 * @author Woena Agordah
 */
module.exports.name = 'WarehouseValidations'
module.exports.dependencies = ['celebrate']
module.exports.factory = _celebrate => {
  'use strict'

  const { celebrate, Joi } = _celebrate

  const post = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        manager: Joi.string().required(),
        location: Joi.string().required()
      })
      .required()
  })

  const patch = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string(),
        manager: Joi.string(),
        location: Joi.string()
      })
      .required()
  })

  const querySearch = celebrate({
    query: Joi.object().keys({
      name: Joi.string(),
      manager: Joi.string(),
      location: Joi.string()
    })
  })

  return {
    post,
    patch,
    querySearch
  }
}
