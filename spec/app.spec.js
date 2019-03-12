process.env.NODE_ENV = 'test';

const { app } = require('../app');
const { expect } = require('chai');
const request = require('supertest')(app);
const { connection } = require('../connection');

describe('app', () => {

    beforeEach(() => connection.seed.run());
    after(() => connection.destroy())

    describe('/api', () => {
        describe('/users', () => {
            it('GET returns (200) users in database', () => {
                return request
                    .get('/api/users')
                    .expect(200)
                    .then(({ body }) => {
                        body.users.forEach(user => {
                            expect(Object.keys(user)).to.eql(['username', 'avatar_url', 'name']);
                        });
                    });
            });
            it('POST returns (201) user which has been added to database', () => {
                return request
                    .post('/api/users')
                    .send({
                        username: 'Challen',
                        avatar_url: 'www.challenbellamey.com',
                        name: 'Challen Bellamey'
                    })
                    .expect(201)
                    .then(({ body }) => {
                        expect(Object.keys(body.user)).to.eql(['username', 'avatar_url', 'name']);
                    });
            });
        });
        describe('/topics', () => {
            it('GET returns (200) topics in database', () => {
                return request
                    .get('/api/topics')
                    .expect(200)
                    .then(({ body }) => {
                        body.topics.forEach(topic => {
                            expect(Object.keys(topic)).to.eql(['slug', 'description']);
                        });
                    });
            });
            it('POST returns (201) topic added to database', () => {
                return request
                    .post('/api/topics')
                    .send({
                        slug: 'Slugs',
                        description: 'All about the slimy creatures'
                    })
                    .expect(201)
                    .then(({ body }) => {
                        expect(Object.keys(body.topic)).to.eql(['slug', 'description']);
                    });
            });
        });
    });
});