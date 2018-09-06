const { amanda } = require('./cloudant');
const { unify } = require('./bulkExports');

function modalUpdate(details, res) {
  //console.log(unify(details.input));
  amanda.insert(unify(details.input), (err, body) => {
    if (err) {
      console.log(err);
      return res.send({ status: "ERROR" });
    }
    res.send({ status: "OK", _rev: body.rev });
  })
}

module.exports = { modalUpdate };