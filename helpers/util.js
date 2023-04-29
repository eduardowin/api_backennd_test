const paginate = (arr, size, page) => {
    return arr.slice((page - 1) * size, page * size);
}

module.exports = {
    paginate
}