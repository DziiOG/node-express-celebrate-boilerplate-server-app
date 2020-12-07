/**
 *Task Validations. Defining order validations schema using celebrate
 * @author Kenneth Simpson <kenneth2g60@yahoo.com>
 * @created Nov 10, 2020
 */
module.exports.name = 'CropVarietyValidations'
module.exports.dependencies = ['celebrate', 'miscHelper']
module.exports.factory = (_celebrate, helpers) => {
  'use strict'

  const { celebrate, Joi } = _celebrate
  const { ACTIVE, INACTIVE } = helpers.Status

  const post = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        crop: Joi.string().required(),
        imageUrl: Joi.string().required()
      })
      .required()
  })

  const patch = celebrate({
    body: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string(),
      crop: Joi.string(),
      imageUrl: Joi.string(),
      status: Joi.string().valid(ACTIVE, INACTIVE)
    })
  })

  const querySearch = celebrate({
    query: Joi.object().keys({
      name: Joi.string(),
      crop: Joi.string(),
      status: Joi.string().valid(ACTIVE, INACTIVE)
    })
  })

  return {
    post,
    patch,
    querySearch
  }
}
