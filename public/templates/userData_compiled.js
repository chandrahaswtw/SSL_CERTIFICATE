(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['userData'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    <tr>\r\n      <th scope=\"row\">1</th>\r\n      <td>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.username : depth0), depth0))
    + "</td>\r\n      <td>\r\n        <i class=\"fas fa-trash-alt\"></i>\r\n      </td>\r\n    </tr>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table table-hover shadow p-3 mb-5 bg-white rounded\" id=\"userTable\">\r\n  <caption>LIST OF USERS</caption>\r\n  <thead class=\"thead-dark\">\r\n    <tr>\r\n      <th scope=\"col\">#</th>\r\n      <th scope=\"col\">Username</th>\r\n      <th scope=\"col\"></th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </tbody>\r\n</table>";
},"useData":true});
})();
