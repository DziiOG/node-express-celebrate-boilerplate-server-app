/**
 * This module contains integration tests for user controller
 * @author Chinedu Ekene Okpala <chinedu.okpala@completefarmer.com>
 */

// import test dependencies
const testDependencies = require('../init.js')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const request = require('supertest')(testDependencies.bootstrap)
chai.use(chaiAsPromised)
chai.should()

/**
 * Test Suite for Order Controller
 */
suite('Order Controller Test Suites', () => {
  // API Token
  const token = testDependencies.token

  // Base API URL
  const apiBase = '/api/v2'

  // Order ID
  let orderID = null
  // Test Order object
  const Order = {
    farm: '5ebdb1a134efdb3a1868d3c1',
    reference: 'somec reference',
    acreage: 2,
    cycle: 2,
    projectedYield: 3,
    projectedReturn: 4,
    cost: 20000,
    invoice: '',
    receipt: '',
    isOffline: true
  }

  // #region CREATING A NEW Order

  test('Should create a new Order', () => {
    return request
      .post(`${apiBase}/orders`)
      .set('Authorization', 'Bearer ' + token)
      .send(Order)
      .expect(201)
      .expect(res => {
        orderID = res.body.data._id
        res.body.data.user.should.equal('5ebdb1a134efdb3a1868d3c1')
      })
  })

  test('Should get an Order by its ID', () => {
    return request
      .get(`${apiBase}/orders/${orderID}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(res => {
        res.body.data.user.should.equal('5ebdb1a134efdb3a1868d3c1')
      })
  })

  /**
   * Make sure database is in original state after this test
   */
  test('Should delete this Order record created', () => {
    return request
      .delete(`${apiBase}/orders/${orderID}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect(res => {
        res.body.data.user.should.equal('5ebdb1a134efdb3a1868d3c1')
      })
  })
})
