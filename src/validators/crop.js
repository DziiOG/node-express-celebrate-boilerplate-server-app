/**
 *Task Validations. Defining order validations schema using celebrate
 * @author Kenneth Simpson <kenneth2g60@yahoo.com>
 * @created Nov 10, 2020
 */
module.exports.name = 'CropValidations'
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
        imageUrl: Joi.string().required(),
        category: Joi.string().required(),
        cycle: Joi.object()
          .keys({
            min: Joi.number().min(2).required(),
            max: Joi.number().max(12).required()
          })
          .required()
      })
      .required()
  })

  const patch = celebrate({
    body: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string(),
      imageUrl: Joi.string(),
      category: Joi.string(),
      cycle: Joi.object().keys({
        min: Joi.number().min(2).required(),
        max: Joi.number().max(12).required()
      }),
      status: Joi.string().valid(ACTIVE, INACTIVE)
    })
  })

  const querySearch = celebrate({
    query: Joi.object().keys({
      name: Joi.string(),
      category: Joi.string(),
      status: Joi.string().valid(ACTIVE, INACTIVE)
    })
  })

  return {
    post,
    patch,
    querySearch
  }
}
