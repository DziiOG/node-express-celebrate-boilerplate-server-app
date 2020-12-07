/**
 *Task Validations. Defining order validations schema using celebrate
 * @author Kenneth Simpson <kenneth2g60@yahoo.com>
 * @created Nov 10, 2020
 */
module.exports.name = 'CropCategoryValidations'
module.exports.dependencies = ['celebrate']
module.exports.factory = _celebrate => {
  'use strict'

  const { celebrate, Joi } = _celebrate

  const post = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        imageUrl: Joi.string().required()
      })
      .required()
  })

  const patch = celebrate({
    body: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string(),
      imageUrl: Joi.string(),
      status: Joi.string().valid('ACTIVE', 'INACTIVE')
    })
  })

  const querySearch = celebrate({
    query: Joi.object().keys({
      /* here the body */
      name: Joi.string(),
      status: Joi.string().valid('ACTIVE', 'INACTIVE')
    })
  })

  return {
    post,
    patch,
    querySearch
  }
}
