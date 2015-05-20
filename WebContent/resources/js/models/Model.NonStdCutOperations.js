define([
    'backbone',
    'global'
], function(Backbone, global){
	return Backbone.Model.extend({
		urlRoot : function(){
    		// return global.getBaseUrl() + "/granite/api/ir/mtlncutoperations";
    		return "resources/js/test-data/nonstd.json";
    	},
	});
});
