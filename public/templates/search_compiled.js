(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['search'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <tr>\r\n                <td scope=\"col\" class=\"counterCell\"></td>\r\n                <td scope=\"col\">"
    + alias2(alias1((depth0 != null ? depth0.appId : depth0), depth0))
    + "</td>\r\n                <td scope=\"col\">"
    + alias2(alias1((depth0 != null ? depth0.appName : depth0), depth0))
    + "</td>\r\n                <td scope=\"col\">"
    + alias2(alias1((depth0 != null ? depth0.serverName : depth0), depth0))
    + "</td>\r\n                <td scope=\"col\">"
    + alias2(alias1((depth0 != null ? depth0.expDate : depth0), depth0))
    + "</td>\r\n"
    + ((stack1 = (helpers.isStatus || (depth0 && depth0.isStatus) || helpers.helperMissing).call(alias3,(depth0 != null ? depth0.expDate : depth0),(depth0 != null ? depth0.thresholdDays : depth0),{"name":"isStatus","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0._id : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "            </tr>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <td scope=\"col\" id=\""
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"CLICK TO VIEW\"><i class=\"fas fa-eye\"></i></td>\r\n                <td scope=\"col\" id=\""
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"CLICK TO EDIT\"><i class=\"fas fa-edit\"></i></td>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <td scope=\"col\" id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"CLICK TO VIEW\"><i class=\"fas fa-eye\"></i></td>\r\n                <td scope=\"col\" id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"CLICK TO EDIT\"><i class=\"fas fa-edit\"></i></td>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table table-hover shadow p-3 mb-5 bg-white rounded\">\r\n    <caption>LIST OF APPLICATIONS & SERVERS</caption>\r\n            <thead class=\"thead-dark\">\r\n            <tr>\r\n                <th scope=\"col\">#</th>\r\n                <th scope=\"col\">APP ID</th>\r\n                <th scope=\"col\">APP NAME</th>\r\n                <th scope=\"col\">SERVER NAME</th>\r\n                <th scope=\"col\">EXPIRY DATE</th>\r\n                <th scope=\"col\"></th>\r\n                <th scope=\"col\"></th>\r\n                <th scope=\"col\"></th>\r\n            </tr>\r\n            </thead>\r\n    \r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ALL_RECORDS : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </table>\r\n    </script>\r\n";
},"useData":true});
})();
