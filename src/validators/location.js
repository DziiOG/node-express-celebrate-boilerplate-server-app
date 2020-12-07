/**
 *Task Validations. Defining order validations schema using celebrate
 * @author Whitson Dzimah
 */
module.exports.name = 'LocationValidations'
module.exports.dependencies = ['celebrate']
module.exports.factory = _celebrate => {
  'use strict'

  const { celebrate, Joi } = _celebrate

  const post = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        type: Joi.string().valid('farm', 'warehouse'),
        coords: Joi.array().when('type', {
          is: 'farm',
          then: Joi.array()
            .items(
              Joi.string()
                .regex(
                  /^(-?([0-8]?[0-9](\.\d+)?|90(.[0]+)?)\s?[,]\s?)+(-?([1]?[0-7]?[0-9](\.\d+)?|180((.[0]+)?)))$/
                )
                .required()
            )
            .min(3)
            .required()
        })
      })
      .required()
  })

  const patch = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
        type: Joi.string().valid('farm', 'warehouse'),
        coords: Joi.array()
          .items(
            Joi.string()
              .regex(
                /^(-?([0-8]?[0-9](\.\d+)?|90(.[0]+)?)\s?[,]\s?)+(-?([1]?[0-7]?[0-9](\.\d+)?|180((.[0]+)?)))$/
              )
              .required()
          )
          .min(3)
      })
      .required()
  })

  const querySearch = celebrate({
    query: Joi.object().keys({
      name: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      type: Joi.string().valid('farm', 'warehouse')
    })
  })

  return {
    post,
    patch,
    querySearch
  }
}
