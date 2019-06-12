exports.createRef = (array, keyVal, val) => {
    return array.reduce((acc, element) => {
        acc[element[keyVal]] = element[val];
        return acc;
    }, {})
};

exports.formatUserData = (userData) => {
    let newUserData = [ ...userData ];
    return newUserData.map(user => {
        const newUser = { ...user };
        const date = newUser.last_online;
        newUser.last_online = new Date (date);
        return newUser;
    })
};

exports.formatArticleData = (articleData) => {
    let newArticleData = [ ...articleData ];
    return newArticleData.map(article => {
        const newArticle = { ...article };
        const date = newArticle.created_at;
        newArticle.created_at = new Date (date);
        return newArticle;
    })
};

exports.formatCommentData = (commentData, articleRef) => {
    let newCommentData = [ ...commentData ];
    return newCommentData.map(comment => {
        const newComment = { ...comment };

        newComment.created_at = new Date (newComment.created_at);

        newComment.article_id = articleRef[newComment.belongs_to];
        delete newComment.belongs_to;

        newComment.author = newComment.created_by;
        delete newComment.created_by;

        return newComment;
    })
};