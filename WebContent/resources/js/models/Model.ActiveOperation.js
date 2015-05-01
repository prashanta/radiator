define([
    'backbone',
    'global'
], function(Backbone, global){    
	return Backbone.Model.extend({
		urlRoot : function(){			
    		//return global.getBaseUrl() + "/granite/api/ir/mtlxcutactive";
    		return "resources/js/test-data/active.json";
    	},
    	
    	getTimeLapse: function(ms){
    		var date = this.get("labor").clockInDate;
    		var time = this.get("labor").clockInTime;
    		var clockIn = new Date(date + " " + time);
    		var now = new Date();
    		var ms = now - clockIn;
    		var seconds = 0;
    		var minutes = 0;
    		var hours = 0;
    		var days = 0;
    		    		
    		var x = ms / 1000;
    		seconds = Math.floor(x % 60);     		    		
    		if(x > 60){
    			x /= 60;
    			minutes = Math.floor(x % 60);
    			if(x > 60){
    				x /= 60;
    				hours = Math.floor(x % 24);
    				if(x > 24){
    					x /= 24;
    					days = Math.floor(x);
    				}
    			}    			        	
    		}    			    		    		
    		return [days, hours, minutes, seconds];
    	}
	});
});