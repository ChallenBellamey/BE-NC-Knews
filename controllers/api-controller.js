const apiHelper = (req, res, next) => {
    const info = {
        'paths': {
        '/api': {
            'GET': '',
            'POST': '',
            'PATCH': '',
            'DELETE': ''
        },
        '/api/users': {
            'GET': '',
            'POST': '',
            'PATCH': '',
            'DELETE': ''
        },
        '/api/users/:username': {
            'GET': '',
            'POST': '',
            'PATCH': '',
            'DELETE': ''
        },
        '/api/topics': {
            'GET': '',
            'POST': '',
            'PATCH': '',
            'DELETE': ''
        },
        '/api/articles': {
            'GET': '',
            'POST': '',
            'PATCH': '',
            'DELETE': ''
        },
        '/api/:article_id': {
            'GET': '',
            'POST': '',
            'PATCH': '',
            'DELETE': ''
        },
        '/api/articles/:article_id/comments': {
            'GET': '',
            'POST': '',
            'PATCH': '',
            'DELETE': ''
        },
        '/api/comments/:comment_id': {
            'GET': '',
            'POST': '',
            'PATCH': '',
            'DELETE': ''
        }
    }};

    res.status(200).send({ info });
};

module.exports = { apiHelper };