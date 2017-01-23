/* Filename: route.js
 */

define(['marionette'], function (Maironette) {	
	return Marionette.AppRouter.extend({
		
	    routes : {
	      "101": "showCutOperations",
	      "102": "showSMM2Operations"	    	  
	    },
	    
	    showCutOperations : function () {
	    	console.log("Show CUT operations");	    	
	    	require(['views/View.MTLXCUTLayout'], function(vMTLXCUTLayout){    	    				
	    		var mtlxcut = new vMTLXCUTLayout();
	    		window.app.main.show(mtlxcut);
	    	});
	    },
	    
	    showSMM2Operations : function () {
	    	console.log("Show SMM2 operations");	      
	    }		
	});	
});