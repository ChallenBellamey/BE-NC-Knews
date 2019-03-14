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
            it('POST returns (422) when posting user with username that already exists', () => {
                return request
                    .post('/api/users')
                    .send({
                        username: 'butter_bridge',
                        avatar_url: 'www.challenbellamey.com',
                        name: 'Challen Bellamey'
                    })
                    .expect(422)
                    .then(({ body }) => {
                        expect(body.message).to.eql('User already exists!');
                    });
            });
            it('POST returns (400) when posting user that violates database columns', () => {
                return request
                    .post('/api/users')
                    .send({
                        name: 'Challen Bellamey'
                    })
                    .expect(400)
                    .then(({ body }) => {
                        expect(body.message).to.eql('User information not valid!');
                    });
            });
            it('GET with username parameter returns (200) user information', () => {
                return request
                    .get('/api/users/butter_bridge')
                    .expect(200)
                    .then(({ body }) => {
                        expect(body.user.username).to.equal('butter_bridge');
                    });
            });
            it('GET returns (404) user not found when passed username parameter of username that does not exist', () => {
                return request
                    .get('/api/users/non-existent')
                    .expect(404)
                    .then(({ body }) => {
                        expect(body.message).to.equal('User not found!');
                    })
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
            it('POST returns (422) when posting topic with slug that already exists', () => {
                return request
                    .post('/api/topics')
                    .send({
                        description: 'The man, the Mitch, the legend',
                        slug: 'mitch',
                    })
                    .expect(422)
                    .then(({ body }) => {
                        expect(body.message).to.eql('Topic already exists!');
                    });
            });
            it('POST returns (400) when posting topic that violates database columns', () => {
                return request
                    .post('/api/topics')
                    .send({
                        description: 'A discussion over what happens if the slug is not declared.'
                    })
                    .expect(400)
                    .then(({ body }) => {
                        expect(body.message).to.eql('Topic information not valid!');
                    });
            });
        });
        describe('/articles', () => {
            it('GET returns (200) articles in database', () => {
                return request
                    .get('/api/articles')
                    .expect(200)
                    .then(({ body }) => {
                        body.articles.forEach(article => {
                            expect(Object.keys(article)).to.eql(['article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at']);
                        });
                    })
            });
            it('POST returns (201) article added to database', () => {
                return request
                    .post('/api/articles')
                    .send({
                        title: 'Cloud Juice ep 7: Wetherspoons',
                        body: '3/10, worst tap water I have ever tasted, Adam Sandler would be ashamed.',
                        topic: 'mitch',
                        author: 'rogersop'
                    })
                    .expect(201)
                    .then(({ body }) => {
                        expect(Object.keys(body.article)).to.eql(['article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at']);
                    });
            });
            it('POST returns (400) when posting article that violates database columns', () => {
                return request
                    .post('/api/articles')
                    .send({
                        title: 'I will fail. An article\'s story',
                        description: 'A discussion over what happens if an incorrect property is added.'
                    })
                    .expect(400)
                    .then(({ body }) => {
                        expect(body.message).to.eql('Article information not valid!');
                    });
            });
            it('GET returns (200) and article information when passed an article_id parameter', () => {
                return request
                    .get('/api/articles/1')
                    .expect(200)
                    .then(({ body }) => {
                        expect(body.article.article_id).to.equal(1);
                    })
            });
            it('GET returns (404) when passed an article_id parameter that does not exist', () => {
                return request
                    .get('/api/articles/100')
                    .expect(404)
                    .then(({ body }) => {
                        expect(body.message).to.equal('Article not found!')
                    })
            });
            it('PATCH returns (201) and article information when passed an article_id parameter', () => {
                return request
                    .patch('/api/articles/1')
                    .send({title: 'HACKED'})
                    .expect(201)
                    .then(({ body }) => {
                        expect(body.article.article_id).to.equal(1);
                        expect(body.article.title).to.equal('HACKED');
                    })
            });
            it('PATCH returns (404) when passed article_id that does not exist', () => {
                return request
                    .patch('/api/articles/100')
                    .send({title: 'HACKED!'})
                    .expect(404)
                    .then(({ body }) => {
                        expect(body.message).to.equal('Article not found!')
                    })
            });
            it('DELETE returns (204) when passed an article_id parameter', () => {
                return request
                    .delete('/api/articles/1')
                    .expect(204)
            });
            describe('/comments', () => {
                it('GET by article_id returns (200) and an array of comments', () => {
                    return request
                        .get('/api/articles/9/comments')
                        .expect(200)
                        .then(({ body }) => {
                            expect(body.comments).to.be.an('array');
                            body.comments.forEach(comment => {
                                expect(Object.keys(comment)).to.eql(['comment_id', 'author', 'article_id', 'votes', 'created_at', 'body']);
                            });
                        })
                });
                it('POST by article_id returns (201) and the posted comment', () => {
                    return request
                        .post('/api/articles/1/comments')
                        .send({
                            author: 'butter_bridge',
                            body: 'Anyone here?'
                        })
                        .expect(201)
                        .then(({ body }) => {
                            expect(body.comment).to.eql({
                                comment_id: 19,
                                author: 'butter_bridge',
                                article_id: 1,
                                votes: 0,
                                created_at: body.comment.created_at,
                                body: 'Anyone here?'
                            });
                        })
                });
                it('POST by article_id returns (400) when posting an invalid comment', () => {
                    return request
                        .post('/api/articles/1/comments')
                        .send({
                            author: 'butter_bridge',
                            title: 'Hello?',
                            body: 'Anyone here?'
                        })
                        .expect(400)
                        .then(({body}) => {
                            expect(body.message).to.equal('Comment information not valid!')
                        })
                });
                it('POST by article_id returns (404) when posting to an article that does not exist', () => {
                    return request
                        .post('/api/articles/100/comments')
                        .send({
                            author: 'butter_bridge',
                            body: 'Anyone here?'
                        })
                        .expect(404)
                        .then(({body}) => {
                            expect(body.message).to.equal('Article not found!');
                        })
                });
            });
        });
        describe('/comments/:comment_id', () => {
            it('PATCH returns (201) and the updated comment', () => {
                return request
                    .patch('/api/comments/1')
                    .send({
                        body: 'Oops I meant to say this instead.'
                    })
                    .expect(201)
                    .then(({body}) => {
                        expect(body.comment.body).to.equal('Oops I meant to say this instead.');
                    })
            });
            it('DELETE returns (204)', () => {
                return request
                    .delete('/api/comments/1')
                    .expect(204)
            });
        });
    });
});