(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['userData'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<table class=\"table table-hover shadow p-3 mb-5 bg-white rounded\" id=\"userTable\">\r\n  <caption>LIST OF USERS</caption>\r\n  <thead class=\"thead-dark\">\r\n    <tr>\r\n      <th scope=\"col\">#</th>\r\n      <th scope=\"col\">Username</th>\r\n      <th scope=\"col\"></th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr>\r\n      <th scope=\"row\">1</th>\r\n      <td>cballeda@in.ibm.com</td>\r\n      <td>\r\n        <i class=\"fas fa-trash-alt\"></i>\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <th scope=\"row\">2</th>\r\n      <td>Jacob</td>\r\n      <td>\r\n        <i class=\"fas fa-trash-alt\"></i>\r\n      </td>\r\n    </tr>\r\n    <tr>\r\n      <th scope=\"row\">3</th>\r\n      <td>Larry</td>\r\n      <td>\r\n        <i class=\"fas fa-trash-alt\"></i>\r\n      </td>\r\n    </tr>\r\n  </tbody>\r\n</table>";
},"useData":true});
})();
