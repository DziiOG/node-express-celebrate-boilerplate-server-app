/**
 *Task Validations. Defining order validations schema using celebrate
 * @author Whitson Dzimah <workwithwhitson@gmail.com>
 */
module.exports.name = 'FarmFeedValidations'
module.exports.dependencies = ['celebrate']
module.exports.factory = _celebrate => {
  'use strict'

  const { celebrate, Joi } = _celebrate

  const post = celebrate({
    body: Joi.object()
      .keys({
        farm: Joi.string().required(),
        block: Joi.string().required(),
        task: Joi.string().required(),
        nextTask: Joi.string().required(),
        media: Joi.array()
          .items(
            Joi.object()
              .keys({
                type: Joi.string().required(),
                url: Joi.string().required()
              })
              .required()
          )
          .required(),
        plantInfo: Joi.object().keys({
          population: Joi.string().required(),
          stage: Joi.string().required(),
          chlorophyl: Joi.string().required(),
          productivity: Joi.string().required(),
          health: Joi.string().required()
        }),
        summary: Joi.string().required(),
        checker: Joi.bool(),
        status: Joi.bool()
      })
      .required()
  })

  const patch = celebrate({
    body: Joi.object()
      .keys({
        farm: Joi.string(),
        block: Joi.string(),
        task: Joi.string(),
        nextTask: Joi.string(),
        media: Joi.array().items(
          Joi.object()
            .keys({
              type: Joi.string().required(),
              url: Joi.string().required()
            })
            .required()
        ),
        plantInfo: Joi.object().keys({
          population: Joi.string().required(),
          stage: Joi.string().required(),
          chlorophyl: Joi.string().required(),
          productivity: Joi.string().required(),
          health: Joi.string().required()
        }),
        summary: Joi.string(),
        checker: Joi.bool(),
        status: Joi.bool()
      })
      .required()
  })

  const querySearch = celebrate({
    query: Joi.object().keys({
      farm: Joi.string(),
      block: Joi.string()
    })
  })

  return {
    post,
    patch,
    querySearch
  }
}
