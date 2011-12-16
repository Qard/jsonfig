#!/usr/bin/env mocha -r should -R spec
var jsonfig = require('./index')
var dotpath = require('dotpath')

// Test different behaviours of the interface.
describe('jsonfig interface', function () {
  
  var path = __dirname + '/config';

  it('should default to process env', function () {
    jsonfig.env().should.eql(process.env.NODE_ENV || 'development')
  })

  it('should change env to production', function () {
    jsonfig.env('production')
    jsonfig.env().should.eql('production')
  })

  it('should default to __dirname path', function () {
    jsonfig.path().should.eql(__dirname)
  })

  it('should change path to ./config', function () {
    jsonfig.path(path)
    jsonfig.path().should.eql(path)
  })

  function next (origin, conf, cb) {
    cb()
    describe('config interface from '+origin, function () {

      it('should use dotpath module', function () {
        conf.should.be.an.instanceof(dotpath)
        conf.get.should.be.a('function')
      })

      it('should get evironment-specific configs', function () {
        conf.get('redis.host').should.eql('localhost')
      })

      it('should get environment-agnostic configs', function () {
        conf.get('all_envs.some').should.eql('var')
      })

    })
  }

  it('should load from stored path()', function (done) {
    jsonfig.path(path).load(function (err, conf) {
      if (err) { throw new Error(err) }
      next('stored path', conf, done)
    })
  })

  it('should load from supplied path', function (done) {
    jsonfig.path(__dirname).load(path, function (err, conf) {
      if (err) { throw new Error(err) }
      next('supplied path', conf, done)
    })
  })

})