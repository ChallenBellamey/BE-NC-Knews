exports.createRef = (array, keyVal, val) => {
    return array.reduce((acc, element) => {
        acc[element[keyVal]] = element[val];
        return acc;
    }, {})
}