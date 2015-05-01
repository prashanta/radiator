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
	    },
	    
	    showSMM2Operations : function () {
	    	console.log("Show SMM2 operations");	      
	    }		
	});	
});