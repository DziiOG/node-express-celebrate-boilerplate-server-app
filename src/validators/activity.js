/**
 *Task Validations. Defining order validations schema using celebrate
 * @author Chinedu Ekene Okpala
 */
module.exports.name = 'ActivityValidations'
module.exports.dependencies = ['celebrate']
module.exports.factory = _celebrate => {
  'use strict'

  const { celebrate, Joi } = _celebrate

  const post = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        description: Joi.string().required()
      })
      .required()
  })

  const patch = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string(),
        description: Joi.string()
      })
      .required()
  })

  const querySearch = celebrate({
    query: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string()
    })
  })

  return {
    post,
    patch,
    querySearch
  }
}
