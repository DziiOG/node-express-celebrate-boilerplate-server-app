/**
 * This module contains integration tests for user repository
 * @author Chinedu Ekene Okpala <chinedu.okpala@completefarmer.com>
 */

process.env.NODE_ENV = 'TEST'
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiAsPromised)
chai.should()

// import test dependencies
const testDependencies = require('../init.js')

// import entity under test
const ActivityRepoInstance = testDependencies.ActivityRepoInstance
const { ObjectId } = testDependencies.mongoose.Types

// Activity ID
let activityID = null

/**
 * Test Suite for Activity Repository
 */
suite('Activity Repository Test Suites', () => {
  // Test payload object
  const payload = {
    name: 'testActivity',
    description: 'justdescription'
  }

  test('Should not create an activity without a name', () => {
    delete payload.name
    return Promise.resolve(ActivityRepoInstance.insert(payload)).catch(error => {
      error.message.should.equal('Activity validation failed: name: Activity name is required')
    })
  })

  test('Should not create an activity without a description', () => {
    delete payload.description
    payload.name = 'testActivity'
    return Promise.resolve(ActivityRepoInstance.insert(payload)).catch(error => {
      error.message.should.equal(
        'Activity validation failed: description: Activity description is required'
      )
    })
  })

  test('Should create a new activity', () => {
    payload.description = 'justdescription'
    return Promise.resolve(ActivityRepoInstance.insert(payload)).then(res => {
      activityID = res._id
      expect(res.name).to.eql('testActivity')
    })
  })

  test('Should retrieve an activity with a given id', () => {
    return Promise.resolve(ActivityRepoInstance.getById(activityID)).then(result => {
      expect(result.name).to.eql('testActivity')
    })
  })

  test('Should update activity with given id', () => {
    const newPayload = {
      name: 'newTestActivity',
      description: 'newDescription'
    }
    return Promise.resolve(ActivityRepoInstance.update(activityID, newPayload)).then(result => {
      expect(result.name).to.equal('newTestActivity')
    })
  })

  test('Should get all activity records', () => {
    return Promise.resolve(ActivityRepoInstance.get()).then(result => {
      expect(result.length).to.equal(1)
    })
  })

  test('Should delete an activity record given the id', () => {
    return Promise.resolve(ActivityRepoInstance.delete(activityID)).then(result => {
      expect(typeof result).to.equal('object')
    })
  })

  /**
   * Make sure database is in original state after this test
   *
   *
   */
  suiteTeardown(() => {
    const ActivityCollection = testDependencies.mongoose.connection.collection('activities')
    ActivityCollection.deleteOne({ _id: activityID }, (err, res) => {
      if (err) console.log(err)
      console.log(`Deleted ${res.result.n} activity record(s)`)
    })
  })
})
