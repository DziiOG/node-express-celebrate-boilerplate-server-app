/**
 * @summary
 * This is the configuration file for the application enviroment variables
 * @author Whitson Dzimah  <workwithwhitson@gmail.com>
 */
module.exports.name = 'envs'
module.exports.dependencies = false
module.exports.factory = () => {
  'use strict'

  /**
   *
   * @param {string} env, a string representing the environment of application
   * @returns an object having configuration settings for the application
   */
  const getEnvs = env => {
    return {
      anyThing: process.env[`${env}_ANY_THING`],
      awsId: process.env.AWS_ACCESS_KEY_ID,
      awsSecret: process.env.AWS_SECRET_ACCESS_KEY,
      awsRegion: process.env.AWS_REGION,
      secret: process.env.SECRET,
      expiresIn: process.env.EXPIRES_IN,
      redisPass: process.env.REDIS_PASS
    }
  }

  return getEnvs
}
