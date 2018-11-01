(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['modalEdit'] = template({"1":function(container,depth0,helpers,partials,data) {
    return " ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<form id=\"modalEdit\">\r\n\r\n  <div class=\"form-row\">\r\n    <div class=\"form-group col-md-6\">\r\n      <label for=\"appId\">APPLICATION ID</label>\r\n      <input type=\"text\" class=\"form-control\" id=\"appId\" name=\"appId\" autocomplete=\"off\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.appId : stack1), depth0))
    + "\">\r\n    </div>\r\n\r\n    <div class=\"form-group col-md-6\">\r\n      <label for=\"appName\">APPLICATION NAME</label>\r\n      <input type=\"text\" class=\"form-control\" id=\"appName\" name=\"appName\" autocomplete=\"off\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.appName : stack1), depth0))
    + "\">\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-row\">\r\n    <div class=\"form-group col-md-6\">\r\n      <label for=\"envName\">ENVIRONMENT</label>\r\n      <select id=\"envName\" name=\"envName\" class=\"form-control\">\r\n        <option selected value=\"\">Choose...</option>\r\n        <option value=\"Production\">Production</option>\r\n        <option value=\"Pre-Production\">Pre-Production</option>\r\n        <option value=\"Development\">Development</option>\r\n      </select>\r\n    </div>\r\n\r\n    <div class=\"form-group col-md-6\">\r\n      <label for=\"serverName\">SERVER NAME</label>\r\n      <input type=\"text\" class=\"form-control\" id=\"serverName\" name=\"serverName\" autocomplete=\"off\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.serverName : stack1), depth0))
    + "\">\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <label for=\"portfolioName\">PORTFOLIO</label>\r\n    <input type=\"text\" class=\"form-control\" id=\"portfolioName\" name=\"portfolioName\" autocomplete=\"off\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.portfolioName : stack1), depth0))
    + "\">\r\n  </div>\r\n\r\n  <div class=\"form-row\">\r\n    <div class=\"form-group col-sm-12\">\r\n      <label for=\"certName\">CERTIFICATE NAME</label>\r\n      <select id=\"certName\" name=\"certName\" class=\"form-control\">\r\n        <option selected value=\"\">Choose...</option>\r\n        <div class=\"dropdown-divider\"></div>\r\n        <optgroup label=\"SSL Certificates\"></optgroup>\r\n        <!-- <h6 class=\"dropdown-header\">SSL Certificates</h6> -->\r\n\r\n        <option value=\"Web server authentication certificate\">Web server authentication certificate</option>\r\n\r\n        <option value=\"Unified Communications (UC or SAN) certificate\">Unified Communications (UC or SAN) certificate</option>\r\n\r\n        <option value=\"Wildcard certificate\">Wildcard certificate</option>\r\n\r\n        <option value=\"Extended Validation certificate\">Extended Validation certificate</option>\r\n\r\n        <option value=\"Low assurance/domain-validated certificate\">Low assurance/domain-validated certificate</option>\r\n\r\n        <option value=\"Code signing certificate\">Code signing certificate</option>\r\n\r\n        <option value=\"E-mail certificate\">E-mail certificate</option>\r\n\r\n        <option value=\"Root signing certificate\">Root signing certificate</option>\r\n\r\n        <option value=\"Shared SSL certificate\">Shared SSL certificate</option>\r\n\r\n      </select>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-row\">\r\n    <div class=\"form-group col-sm-12\">\r\n      <label for=\"expDate\">EXPIRY DATE (MM/DD/YYYY)</label>\r\n      <div class=\"input-group\">\r\n        <input type=\"text\" class=\"datepicker-here form-control\" id=\"expDate\" name=\"expDate\" placeholder=\"Date\" data-language='en'\r\n          autocomplete=\"off\" required value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.expDate : stack1), depth0))
    + "\">\r\n        <div class=\"input-group-prepend bg-white\">\r\n          <span class=\"input-group-text border-left-0 rounded-right bg-light\" id=\"basic-addon1\">\r\n            <i class=\"fas fa-calendar-alt\"></i>\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-row\">\r\n    <div class=\"form-group col-md-6\">\r\n      <label for=\"primaryName\">PRIMARY NAME</label>\r\n      <div class=\"input-group\">\r\n        <input type=\"text\" class=\"form-control\" id=\"primaryName\" name=\"primaryName\" autocomplete=\"off\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.primaryName : stack1), depth0))
    + "\">\r\n        <div class=\"input-group-prepend bg-white\">\r\n          <span class=\"input-group-text border-left-0 rounded-right bg-light\" id=\"basic-addon1\">\r\n            <i class=\"fa fa-user\"></i>\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"form-group col-md-6\">\r\n      <label for=\"primaryPhone\">PRIMARY PHONE NUMBER</label>\r\n      <div class=\"input-group\">\r\n        <input type=\"tel\" class=\"form-control\" id=\"primaryPhone\" name=\"primaryPhone\" autocomplete=\"off\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.primaryPhone : stack1), depth0))
    + "\">\r\n        <div class=\"input-group-prepend bg-white\">\r\n          <span class=\"input-group-text border-left-0 rounded-right bg-light\" id=\"basic-addon1\">\r\n            <i class=\"fas fa-phone\"></i>\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <label for=\"primaryEmail\">PRIMARY EMAIL</label>\r\n    <div class=\"input-group\">\r\n      <input type=\"email\" class=\"form-control\" id=\"primaryEmail\" name=\"primaryEmail\" autocomplete=\"off\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.primaryEmail : stack1), depth0))
    + "\">\r\n      <div class=\"input-group-prepend bg-white\">\r\n        <span class=\"input-group-text border-left-0 rounded-right bg-light\" id=\"basic-addon1\">\r\n          <i class=\"far fa-envelope\"></i>\r\n        </span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-row\">\r\n    <div class=\"form-group col-md-6\">\r\n      <label for=\"secondaryName\">SECONDARY NAME</label>\r\n      <div class=\"input-group\">\r\n        <input type=\"text\" class=\"form-control\" id=\"secondaryName\" name=\"secondaryName\" autocomplete=\"off\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.secondaryName : stack1), depth0))
    + "\">\r\n        <div class=\"input-group-prepend bg-white\">\r\n          <span class=\"input-group-text border-left-0 rounded-right bg-light\" id=\"basic-addon1\">\r\n            <i class=\"fa fa-user\"></i>\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"form-group col-md-6\">\r\n      <label for=\"secondaryPhone\">SECONDARY PHONE NUMBER</label>\r\n      <div class=\"input-group\">\r\n        <input type=\"tel\" class=\"form-control\" id=\"secondaryPhone\" name=\"secondaryPhone\" autocomplete=\"off\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.secondaryPhone : stack1), depth0))
    + "\">\r\n        <div class=\"input-group-prepend bg-white\">\r\n          <span class=\"input-group-text border-left-0 rounded-right bg-light\" id=\"basic-addon1\">\r\n            <i class=\"fas fa-phone\"></i>\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <label for=\"secondaryEmail\">SECONDARY EMAIL</label>\r\n    <div class=\"input-group\">\r\n      <input type=\"email\" class=\"form-control\" id=\"secondaryEmail\" name=\"secondaryEmail\" autocomplete=\"off\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.secondaryEmail : stack1), depth0))
    + "\">\r\n      <div class=\"input-group-prepend bg-white\">\r\n        <span class=\"input-group-text border-left-0 rounded-right bg-light\" id=\"basic-addon1\">\r\n          <i class=\"far fa-envelope\"></i>\r\n        </span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-row\">\r\n    <div class=\"form-group col-md-6\">\r\n      <label for=\"alertToolName\">ALERT TOOL NAME</label>\r\n      <input type=\"text\" class=\"form-control\" id=\"alertToolName\" name=\"alertToolName\" autocomplete=\"off\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.alertToolName : stack1), depth0))
    + "\">\r\n    </div>\r\n    <div class=\"form-group col-md-6\" style=\"text-align: center\">\r\n      <label for=\"alertMech\">ALERT MECHANISM</label>\r\n      <br> "
    + ((stack1 = (helpers.isAlertEdit || (depth0 && depth0.isAlertEdit) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.ALL_RECORDS : depth0)) != null ? stack1.alertMech : stack1),{"name":"isAlertEdit","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <label for=\"exampleFormControlTextarea1\">REMARKS</label>\r\n    <textarea class=\"form-control\" id=\"textArea\" rows=\"3\" name=\"remarks\"> \r\n    </textarea>\r\n  </div>\r\n\r\n\r\n</form>";
},"useData":true});
})();
