/**
 *Task Validations. Defining order validations schema using celebrate
 * @author Whitson Dzimah <workwithwhitson@gmail.com>
 */
module.exports.name = 'BlockValidations'
module.exports.dependencies = ['celebrate']
module.exports.factory = _celebrate => {
  'use strict'

  const { celebrate, Joi } = _celebrate

  const post = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        location: Joi.string().required(),
        coords: Joi.array()
          .items(
            Joi.string()
              .regex(
                /^(-?([0-8]?[0-9](\.\d+)?|90(.[0]+)?)\s?[,]\s?)+(-?([1]?[0-7]?[0-9](\.\d+)?|180((.[0]+)?)))$/
              )
              .required()
          )
          .min(3)
          .required(),
        arable: Joi.string().required()
      })
      .required()
  })

  const patch = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string(),
        location: Joi.string(),
        coords: Joi.array()
          .items(
            Joi.string()
              .regex(
                /^(-?([0-8]?[0-9](\.\d+)?|90(.[0]+)?)\s?[,]\s?)+(-?([1]?[0-7]?[0-9](\.\d+)?|180((.[0]+)?)))$/
              )
              .required()
          )
          .min(3),
        arable: Joi.string()
      })
      .required()
  })

  const querySearch = celebrate({
    query: Joi.object().keys({
      location: Joi.string()
    })
  })

  return {
    post,
    patch,
    querySearch
  }
}
