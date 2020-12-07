/**
 * Order Validations. Defining order validations schema using celebrate
 * @author Woena Agordah
 */
module.exports.name = 'InventoryValidations'
module.exports.dependencies = ['celebrate']
module.exports.factory = _celebrate => {
  'use strict'

  const { celebrate, Joi } = _celebrate

  const post = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        quantity: Joi.number().required(),
        unit: Joi.string().required(),
        warehouse: Joi.string().required(),
        category: Joi.string().valid('inputs', 'machines').required()
      })
      .required()
  })

  const patch = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string(),
        quantity: Joi.number(),
        unit: Joi.string(),
        category: Joi.string().valid('inputs', 'machines')
      })
      .required()
  })

  const querySearch = celebrate({
    query: Joi.object().keys({
      name: Joi.string(),
      quantity: Joi.number(),
      unit: Joi.string(),
      warehouse: Joi.string(),
      category: Joi.string().valid('inputs', 'machines')
    })
  })

  return {
    post,
    patch,
    querySearch
  }
}
