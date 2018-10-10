(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "    <tr>\r\n        <td scope=\"col\" class=\"counterCell\"></td>\r\n        <td scope=\"col\">"
    + alias2(alias1((depth0 != null ? depth0.appId : depth0), depth0))
    + "</td>\r\n        <td scope=\"col\">"
    + alias2(alias1((depth0 != null ? depth0.appName : depth0), depth0))
    + "</td>\r\n        <td scope=\"col\">"
    + alias2(alias1((depth0 != null ? depth0.serverName : depth0), depth0))
    + "</td>\r\n        <td scope=\"col\">"
    + alias2(alias1((depth0 != null ? depth0.expDate : depth0), depth0))
    + "</td>\r\n\r\n        "
    + ((stack1 = (helpers.isStatus || (depth0 && depth0.isStatus) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.expDate : depth0),{"name":"isStatus","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n\r\n        <td scope=\"col\">\r\n            <button type=\"button\" name=\"modalViewBtn\" style=\"padding: 0;border: none;background: none\" id=\""
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + "\" _rev=\""
    + alias2(alias1((depth0 != null ? depth0._rev : depth0), depth0))
    + "\">\r\n                <i class=\"fas fa-eye\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"CLICK TO VIEW\"></i>\r\n            </button>\r\n\r\n        </td>\r\n\r\n        <td scope=\"col\">\r\n            <button type=\"button\" name=\"modalEditBtn\" style=\"padding: 0;border: none;background: none\" id=\""
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + "\" _rev=\""
    + alias2(alias1((depth0 != null ? depth0._rev : depth0), depth0))
    + "\">\r\n                <i class=\"fas fa-edit \" data-toggle=\"tooltip\" data-placement=\"top\" title=\"CLICK TO EDIT\"></i>\r\n            </button>\r\n        </td>\r\n\r\n        <td scope=\"col\">\r\n            <button type=\"button\" name=\"mailTrig\" style=\"padding: 0;border: none;background: none\" id=\""
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + "\" _rev=\""
    + alias2(alias1((depth0 != null ? depth0._rev : depth0), depth0))
    + "\">\r\n                <i class=\"fas fa-envelope\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"CLICK TO TRIGGER MAIL\"></i>\r\n            </button>\r\n        </td>\r\n    </tr>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table table-hover shadow p-3 mb-5 bg-white rounded\" id=\"HOME_TABLE\">\r\n    <caption>LIST REFLECTING THE SERVERS AND CERTIFICATE INFO</caption>\r\n    <thead class=\"thead-dark\">\r\n        <tr>\r\n            <th scope=\"col\">#</th>\r\n            <th scope=\"col\">APP ID</th>\r\n            <th scope=\"col\">APP NAME</th>\r\n            <th scope=\"col\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"CLICK HERE TO SORT RESULTS BY SERVER NAME\">SERVER NAME</th>\r\n            <th scope=\"col\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"CLICK HERE TO SORT RESULTS BY EXPIRY DATE\">EXPIRY DATE</th>\r\n            <th scope=\"col\"></th>\r\n            <th scope=\"col\"></th>\r\n            <th scope=\"col\"></th>\r\n            <th scope=\"col\"></th>\r\n        </tr>\r\n    </thead>\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ALL_RECORDS : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</table>";
},"useData":true});
})();
