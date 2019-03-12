process.env.NODE_ENV = 'test';

const { app } = require('../app');
const expect = require('chai');
const request = require('supertest')(app);

describe('app', () => {
    describe('/api', () => {
        describe('/', () => {
            it('GET returns (201)', () => {
                return request.get('/api')
                    .then(res => {
                        console.log(res.body);
                    })
            });
        });
    });
});