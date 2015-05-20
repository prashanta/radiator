define([
  'backbone',
  'global'
  ], function(Backbone, global){
    return Backbone.Model.extend({
      urlRoot : function(){
        // return global.getBaseUrl() + "/URI/of/JobCountData";
        return "resources/js/test-data/JobCountData.json";
      },

      json: function(){
        return this.toJSON();
      }
    });
  });
