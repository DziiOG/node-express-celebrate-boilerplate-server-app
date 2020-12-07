/**
 *Task Validations. Defining order validations schema using celebrate
 * @author Whitson Dzimah
 */
module.exports.name = 'FarmValidations'
module.exports.dependencies = ['celebrate']
module.exports.factory = _celebrate => {
  'use strict'

  const { celebrate, Joi } = _celebrate

  const post = celebrate({
    body: Joi.object()
      .keys({
        cropVariety: Joi.string().required(),
        managers: Joi.array().items(Joi.string().required()).required(),
        operators: Joi.array().items(Joi.string().required()).required(),
        location: Joi.string().required(),
        projectedYieldPerAcre: Joi.number().required(),
        projectedReturnsPerAcre: Joi.number().required(),
        acreage: Joi.number().required(),
        startDate: Joi.date().required(),
        marketingDeadline: Joi.date(),
        activities: Joi.array()
          .items(
            Joi.object()
              .keys({
                activity: Joi.string().required(),
                status: Joi.boolean().required()
              })
              .required()
          )
          .required(),
        pricePerAcre: Joi.number().required(),
        priority: Joi.number()
      })
      .required()
  })

  const patch = celebrate({
    body: Joi.object().keys({
      cropVariety: Joi.string(),
      managers: Joi.array().items(Joi.string().required()),
      operators: Joi.array().items(Joi.string().required()),
      projectedYieldPerAcre: Joi.number().required(),
      projectedReturnsPerAcre: Joi.number().required(),
      acreage: Joi.number(),
      startDate: Joi.date(),
      marketingDeadline: Joi.date(),
      location: Joi.string(),
      activities: Joi.array().items(
        Joi.object()
          .keys({
            _id: Joi.string().required(),
            status: Joi.boolean().required()
          })
          .required()
      ),
      pricePerAcre: Joi.number(),
      priority: Joi.number()
    })
  })

  const updateAcreage = celebrate({
    body: Joi.object().keys({
      type: Joi.string(),
      acreage: Joi.number()
    })
  })

  const querySearch = celebrate({
    query: Joi.object().keys({
      cropVariety: Joi.string(),
      location: Joi.string()
    })
  })

  return {
    post,
    patch,
    updateAcreage,
    querySearch
  }
}
