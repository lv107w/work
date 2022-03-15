(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['modal.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <div class=\"form-group\">\r\n        <label class=\"col-sm-2 control-label\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":10,"column":46},"end":{"line":10,"column":55}}}) : helper)))
    + "</label>\r\n        <div class=\"col-sm-10\">\r\n          <input type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":12,"column":23},"end":{"line":12,"column":31}}}) : helper)))
    + "\" data-input-query=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"query") || (depth0 != null ? lookupProperty(depth0,"query") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"query","hash":{},"data":data,"loc":{"start":{"line":12,"column":51},"end":{"line":12,"column":60}}}) : helper)))
    + "\" class=\"form-control\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"placeholder") || (depth0 != null ? lookupProperty(depth0,"placeholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"placeholder","hash":{},"data":data,"loc":{"start":{"line":12,"column":96},"end":{"line":12,"column":111}}}) : helper)))
    + "\">\r\n        </div>\r\n      </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <button type=\"button\" class=\"btn btn-default\" data-btn-target=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"targetName") || (depth0 != null ? lookupProperty(depth0,"targetName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"targetName","hash":{},"data":data,"loc":{"start":{"line":20,"column":67},"end":{"line":20,"column":81}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":20,"column":83},"end":{"line":20,"column":91}}}) : helper)))
    + "</button>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"blog-modal--wrap\">\r\n  <div class=\"blog-modal--head\">\r\n    <h4 class=\"blog-modal--title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":3,"column":34},"end":{"line":3,"column":43}}}) : helper)))
    + "</h4>\r\n    <button type=\"button\" class=\"close blog-modal--close\"><span aria-hidden=\"true\">&times;</span></button>\r\n  </div>\r\n  <div class=\"blog-modal--content\">\r\n    <form class=\"form-horizontal\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"formData") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":6},"end":{"line":15,"column":15}}})) != null ? stack1 : "")
    + "    </form>\r\n  </div>\r\n  <div class=\"blog-modal--foot\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"btns") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":4},"end":{"line":21,"column":13}}})) != null ? stack1 : "")
    + "  </div>\r\n</div>";
},"useData":true});
})();