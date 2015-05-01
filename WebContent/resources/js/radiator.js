define([
        'backbone', 
        'marionette'       
        ], function(Backbone, Marionette){

	return Marionette.Application.extend({
		regions:{
			main: '#main'
		}
	});
});