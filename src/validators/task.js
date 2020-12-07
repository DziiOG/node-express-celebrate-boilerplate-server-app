/**
 * Task Validations. Defining Tasks validations schema using celebrate
 * @author Whitson Dzimah
 */
module.exports.name = 'TaskValidations'
module.exports.dependencies = ['celebrate']
module.exports.factory = _celebrate => {
  'use strict'

  const { celebrate, Joi } = _celebrate

  const post = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        budget: Joi.number().required(),
        description: Joi.string().required(),
        activity: Joi.string().required(),
        kpis: Joi.array().items(Joi.string().required()).required(),
        inputs: Joi.array()
          .items(
            Joi.object().keys({
              item: Joi.string().required(),
              quantity: Joi.number().required()
            })
          )
          .required(),
        machines: Joi.array()
          .items(
            Joi.object().keys({
              item: Joi.string().required(),
              quantity: Joi.number().required()
            })
          )
          .required(),
        labourers: Joi.object()
          .keys({
            men: Joi.number().required(),
            women: Joi.number().required()
          })
          .required()
      })
      .required()
  })

  const patch = celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string(),
        budget: Joi.number(),
        description: Joi.string(),
        kpis: Joi.array().items(Joi.string().required()),
        activity: Joi.string(),
        inputs: Joi.array().items(
          Joi.object().keys({
            item: Joi.string().required(),
            quantity: Joi.number().required()
          })
        ),
        machines: Joi.array().items(
          Joi.object().keys({
            item: Joi.string().required(),
            quantity: Joi.number().required()
          })
        ),
        labourers: Joi.object().keys({
          men: Joi.number().required(),
          women: Joi.number().required()
        })
      })
      .required()
  })

  const querySearch = celebrate({
    query: Joi.object().keys({
      /* here the body */
      name: Joi.string(),
      budget: Joi.number(),
      description: Joi.string(),
      activity: Joi.string()
    })
  })

  return {
    post,
    patch,
    querySearch
  }
}
