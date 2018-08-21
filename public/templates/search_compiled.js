(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['search'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <tr>\r\n                <td scope=\"col\" class=\"counterCell\"></td>\r\n                <td scope=\"col\">"
    + alias2(alias1((depth0 != null ? depth0.appId : depth0), depth0))
    + "</td>\r\n                <td scope=\"col\">"
    + alias2(alias1((depth0 != null ? depth0.appName : depth0), depth0))
    + "</td>\r\n                <td scope=\"col\">"
    + alias2(alias1((depth0 != null ? depth0.serverName : depth0), depth0))
    + "</td>\r\n                <td scope=\"col\">"
    + alias2(alias1((depth0 != null ? depth0.expDate : depth0), depth0))
    + "</td>\r\n                <td scope=\"col\" id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.doc : depth0)) != null ? stack1._id : stack1), depth0))
    + "\"><i class=\"fas fa-eye\"></i></td>\r\n                <td scope=\"col\" id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.doc : depth0)) != null ? stack1._id : stack1), depth0))
    + "\"><i class=\"fas fa-edit\"></i></td>\r\n            </tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table table-hover\">\r\n    <caption>LIST OF APPLICATIONS & SERVERS</caption>\r\n            <thead class=\"thead-dark\">\r\n            <tr>\r\n                <th scope=\"col\">#</th>\r\n                <th scope=\"col\">APP ID</th>\r\n                <th scope=\"col\">APP NAME</th>\r\n                <th scope=\"col\">SERVER NAME</th>\r\n                <th scope=\"col\">EXPIRY DATE</th>\r\n                <th></th>\r\n                <th></th>\r\n            </tr>\r\n            </thead>\r\n    \r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ALL_RECORDS : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </table>\r\n    </script>\r\n";
},"useData":true});
})();
