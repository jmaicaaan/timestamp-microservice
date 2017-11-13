'use strict';

var assert = require('assert');
var app = require('../../../dist/index');
var server = require('supertest');

describe('#timestamp', function () {
  describe('#timestampHandler', function () {
    afterEach(function () {
      app.close();
    });
    var timestamp = {
      unix: 863798400,
      naturalDate: 'May 17, 1997'
    };
    it('should convert unix timestamp to natural date', function (done) {
      server(app).get('/timestamp').query({ date: timestamp.unix }).expect(200).end(function (err, res) {
        assert.equal(res.body.naturalDate, timestamp.naturalDate);
        done(err);
      });
    });
    it('should convert natural date to unix timestamp', function (done) {
      server(app).get('/timestamp').query({ date: timestamp.naturalDate }).expect(200).end(function (err, res) {
        assert.equal(res.body.unix, timestamp.unix);
        done(err);
      });
    });
    it('should not convert invalid unix timestamp to natural date', function (done) {
      server(app).get('/timestamp').query({ date: 9999999999999999 }).expect(500, done);
    });
    it('should not convert invalid natural date to unix timestamp', function (done) {
      server(app).get('/timestamp').query({ date: 'invalid-month 12, 1997' }).expect(500, done);
    });
    it('should not allow empty arg', function (done) {
      server(app).get('/timestamp').query({ date: '' }).expect(500, done);
    });
  });
});