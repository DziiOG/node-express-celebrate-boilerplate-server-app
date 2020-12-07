/**
 * This module contains unit test for user model
 * @author Chinedu Ekene Okpala <chinedu.okpala@completefarmer.com>
 */

const assert = require('chai').assert
// import test dependencies
const testDependencies = require('../init.js')
// import entity under test
const BlockModel = testDependencies.BlockModel

/**
 * Test Suite for block Model
 */
suite('Block Model Test Suites', () => {
  // Test testBlock object
  const testBlock = {
    name: 'yarm block',
    location: '5f2d4f7fcfebb3001267eca3',
    coords: ['9.7267833', '-0.49975'],
    arable: 'arablestuff'
  }

  test('Should not save without a name', () => {
    delete testBlock.name
    const block = new BlockModel(testBlock)
    block.validate(err => {
      assert.equal(err.errors.name, 'Block name is required')
    })
  })

  test('Should not save without a location', () => {
    testBlock.name = 'block1'
    delete testBlock.location
    const block = new BlockModel(testBlock)
    block.validate(err => {
      assert.equal(err.errors.location, 'Location is required')
    })
  })

  test('Should not save without coords', () => {
    testBlock.location = '5ebdb1a134efdb3a1868d3c1'
    delete testBlock.coords
    const block = new BlockModel(testBlock)
    block.validate(err => {
      assert.equal(err.errors.coords, 'Coords is required')
    })
  })

  test('Should not save without arable', () => {
    testBlock.coords = ['9.7267833', '-0.49975']
    delete testBlock.arable
    const block = new BlockModel(testBlock)
    block.validate(err => {
      assert.equal(err.errors.arable, 'Arable is required')
    })
  })

  test('Should save a block', () => {
    testBlock.arable = 'arable'
    const block = new BlockModel(testBlock)
    block.validate(err => {
      assert.equal(err, null)
    })
  })
})
