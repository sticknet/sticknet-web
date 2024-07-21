module.exports = async function ({blob}) {
    return new Blob([blob], {type: 'image/jpeg'});
};
