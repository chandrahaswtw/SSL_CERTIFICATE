function unify(data) {
    var unified_data = data.reduce(function (acc, x) {
        acc[`${x.name}`] = x.value;
        return acc;
    }, {});
    return unified_data;
}

var url = `https://${process.env.account}.cloudant.com/dummy/_all_docs?include_docs=true`;

module.exports = {unify,url};