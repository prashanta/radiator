define([
    'backbone',
    'global'
], function(Backbone, global){
	return Backbone.Model.extend({
		urlRoot : function(){
    		return global.getBaseUrl() + "/granite/api/ir/mtlxcutoperations";
			//return "resources/js/test-data/std.json";
    	},
	});
});
