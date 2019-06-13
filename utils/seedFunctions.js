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
        const date = new Date(newUser.last_online);
        date.setTime(date.getTime() + date.getTimezoneOffset());
        newUser.last_online = `${Math.floor(date.getDate() / 10)}${date.getDate() % 10}/${Math.floor(date.getMonth() / 10)}${date.getMonth() % 10}/${date.getFullYear()} ${Math.floor(date.getHours() / 10)}${date.getHours() % 10}:${date.getMinutes()}`;
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