process.env.NODE_ENV = 'test';

const { app } = require('../app');
const { expect } = require('chai');
const request = require('supertest')(app);
const { connection } = require('../connection');

describe('app', () => {

    beforeEach(() => connection.seed.run());
    after(() => connection.destroy())

    describe('/api', () => {

        it('GET returns (200) and information about each end-point and available methods', () => {
            return request
                .get('/api')
                .expect(200)
                .then(({body}) => {
                    expect(Object.keys(body.info.paths)).to.eql(['/api', '/api/users', '/api/users/:username', '/api/topics', '/api/articles', '/api/:article_id', '/api/articles/:article_id/comments', '/api/comments/:comment_id']);
                    Object.keys(body.info.paths).forEach(pathKey => {
                        expect(Object.keys(body.info.paths[pathKey])).to.eql(['GET', 'POST', 'PATCH', 'DELETE']);
                    });
                })
        });

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
                        username: 'challen',
                        avatar_url: 'www.challenbellamey.com',
                        name: 'Challen Bellamey'
                    })
                    .expect(201)
                    .then(({ body }) => {
                        expect(Object.keys(body.user)).to.eql(['username', 'avatar_url', 'name']);
                    })
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
            it('PATCH returns (405) method not allowed', () => {
                return request
                    .patch('/api/users')
                    .send({ username: 'Challen' })
                    .expect(405)
            });
            it('DELETE returns (405) method not allowed', () => {
                return request 
                    .delete('/api/users')
                    .expect(405)
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
            it('PATCH returns (405) method not allowed', () => {
                return request
                    .patch('/api/topics')
                    .send({ slug: 'Slugs: the re-slugguning' })
                    .expect(405)
            });
            it('DELETE returns (405) method not allowed', () => {
                return request 
                    .delete('/api/topics')
                    .expect(405)
            });
        });
        describe('/articles', () => {
            it('GET returns (200) articles in database', () => {
                return request
                    .get('/api/articles')
                    .expect(200)
                    .then(({ body }) => {
                        body.articles.forEach(article => {
                            expect(Object.keys(article)).to.eql(['article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at', 'comment_count']);
                        });
                        expect(body.articles.length).to.equal(12);
                    })
            });
            it('GET returns (200) articles in database when author query is added', () => {
                return request 
                    .get('/api/articles?author=butter_bridge')
                    .expect(200)
                    .then(({ body }) => {
                        body.articles.forEach(article => {
                            expect(article.author === 'butter_bridge');
                        });
                    })
            });
            it('GET returns (200) articles in database when topic query is added', () => {
                return request 
                    .get('/api/articles?topic=mitch')
                    .expect(200)
                    .then(({ body }) => {
                        body.articles.forEach(article => {
                            expect(article.topic === 'mitch');
                        });
                    })
            });
            it('GET returns (200) articles in database when sort_by query is added', () => {
                return request
                    .get('/api/articles?sort_by=article_id&order=asc')
                    .expect(200)
                    .then(({body}) => {
                        body.articles.forEach((article, index) => {
                            if (index !== 0) {
                                expect(article.article_id > body.articles[index - 1].article_id).to.be.true;
                            };
                        })
                    })
            });
            it('GET returns (200) limited and pagenated articles when limit and p queries are added', () => {
                return request
                    .get('/api/articles?limit=5&p=2')
                    .expect(200)
                    .then(({body}) => {
                        expect(body.articles[0].article_id).to.equal(6);
                        expect(body.articles[4].article_id).to.equal(10);
                    })
            });
            it('GET returns (200) standard results when passed an invalid sort_by query', () => {
                return request 
                    .get('/api/articles?sort_by=rating')
                    .expect(200)
                    .then(({body}) => {
                        body.articles.forEach(article => {
                            expect(Object.keys(article)).to.eql(['article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at', 'comment_count']);
                        });
                        expect(body.articles.length).to.equal(12);
                    })
            });
            it('GET returns (400) when passed an article_id that is invalid', () => {
                return request
                    .get('/api/articles/abc')
                    .expect(400) 
                    .then(({body}) => {
                        expect(body.message).to.equal('Article id invalid!');
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
                        expect(Object.keys(body.article)).to.eql(['article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at', 'comment_count'])
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
            it('PATCH (200) updates article when sent updates in body', () => {
                return request
                    .patch('/api/articles/1')
                    .send({
                        body: 'Oops I meant this instead!'
                    })
                    .expect(200)
                    .then(({body}) => {
                        expect(body.article.body).to.equal('Oops I meant this instead!');
                    })
            });
            it('PATCH (200) increments vote when passed an inc_vote property', () => {
                return request
                    .patch('/api/articles/1')
                    .send({inc_votes: 1})
                    .expect(200)
                    .then(({body}) => {
                        expect(body.article.votes).to.equal(101);
                    })
            });
            it('PATCH returns (400) when passed invalid inc_votes parameter', () => {
                return request
                    .patch('/api/articles/1')
                    .send({
                        inc_votes: 'abc'
                    })
                    .expect(400)
                    .then(({body}) => {
                        expect(body.message).to.equal('inc_votes invalid!');
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
                            expect(body.comments.length).to.equal(2);
                        })
                });
                it('GET by article_id returns (200) and an array of comments when sort_by query is added', () => {
                    return request
                        .get('/api/articles/9/comments?sort_by=comment_id&order=asc')
                        .expect(200)
                        .then(({body}) => {
                            body.comments.forEach((comment, index) => {
                                if (index !== 0) {
                                    expect(comment.comment_id > body.comments[index - 1].comment_id).to.be.true;
                                };
                            })
                        })
                });
                it('GET returns (200) limited and pagenated comments when limit and p queries are added', () => {
                    return request
                        .get('/api/articles/1/comments?limit=5&p=2')
                        .expect(200)
                        .then(({body}) => {
                            expect(body.comments[0].comment_id).to.equal(7)
                            expect(body.comments[4].comment_id).to.equal(11)
                            expect(body.comments.length).to.equal(5);
                        })
                });
                it('GET returns (404) when passed non existent article_id', () => {
                    return request
                        .get('/api/articles/100/comments')
                        .expect(404)
                        .then(({body}) => {
                            expect(body.message).to.equal('Article not found!');
                        })
                });
                it('GET returns (400) when passed an article_id that is invalid', () => {
                    return request
                        .get('/api/articles/abc/comments')
                        .expect(400)
                        .then(({body}) => {
                            expect(body.message).to.equal('Article id invalid!')
                        })
                });
                it('POST by article_id returns (201) and the posted comment', () => {
                    return request
                        .post('/api/articles/1/comments')
                        .send({
                            username: 'butter_bridge',
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
                            username: 'butter_bridge',
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
                            username: 'butter_bridge',
                            body: 'Anyone here?'
                        })
                        .expect(404)
                        .then(({body}) => {
                            expect(body.message).to.equal('Article not found!');
                        })
                });
                it('POST returns (422) when passed a username that does not exist', () => {
                    return request
                        .post('/api/articles/1/comments')
                        .send({
                            username: 'Challen',
                            body: 'Hi, I\'m new here'
                        })
                        .expect(422)
                        .then(({body}) => {
                            expect(body.message).to.equal('User does not exist!');
                        })
                });
                it('PATCH returns (405) method not allowed', () => {
                    return request
                        .patch('/api/articles/:article_id/comments')
                        .send({ body: 'Oops I meant to say this instead!' })
                        .expect(405)
                });
                it('DELETE returns (405) method not allowed', () => {
                    return request 
                        .delete('/api/articles/:article_id/comments')
                        .expect(405)
                });
            });
        });
        describe('/comments/:comment_id', () => {
            it('PATCH returns (200) and the updated comment', () => {
                return request
                    .patch('/api/comments/1')
                    .send({
                        body: 'Oops I meant to say this instead.'
                    })
                    .expect(200)
                    .then(({body}) => {
                        expect(body.comment.body).to.equal('Oops I meant to say this instead.');
                    })
            });
            it('PATCH returns (200) and updates the vote count when sent inc_votes', () => {
                return request
                    .patch('/api/comments/1')
                    .send({
                        inc_votes: 1
                    })
                    .expect(200)
                    .then(({body}) => {
                        expect(body.comment.votes).to.equal(17);
                    })
            });
            it('PATCH returns (400) when passed invalid inc_votes property', () => {
                return request
                    .patch('/api/comments/1')
                    .send({
                        inc_votes: 'abc'
                    })
                    .expect(400)
                    .then(({body}) => {
                        expect(body.message).to.equal('Invalid inc_votes!');
                    })
            });
            it('PATCH returns (404) when passed non existent comment_id', () => {
                return request
                    .patch('/api/comments/100')
                    .send({
                        inc_votes: 1
                    })
                    .expect(404)
                    .then(({body}) => {
                        expect(body.message).to.equal('Comment not found!');
                    })
            });
            it('PATCH returns (400) when passed invalid comment_id', () => {
                return request
                    .patch('/api/comments/abc')
                    .send({
                        inc_votes: 1
                    })
                    .expect(400)
                    .then(({body}) => {
                        expect(body.message).to.equal('Invalid comment id!');
                    })
            });
            it('DELETE returns (204)', () => {
                return request
                    .delete('/api/comments/1')
                    .expect(204)
            });
            it('GET returns (405) method not allowed', () => {
                return request
                    .get('/api/comments/:comment_id')
                    .expect(405)
            });
            it('POST returns (405) method not allowed', () => {
                return request 
                    .post('/api/comments/:comment_id')
                    .send({ body: 'Hi!' })
                    .expect(405)
            });
        });
    });
});