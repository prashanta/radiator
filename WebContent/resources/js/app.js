define([
        'backbone', 
        'marionette', 
        'handlebars',        
        'route',        
        ], function(Backbone, Marionette, Handlebars, Router){

	// Replace underscore.js with handlebars.js template complier 
	Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
		return Handlebars.compile(rawTemplate);        
	};
	
	Handlebars.registerHelper("debug", function(optionalValue) {
		console.log("Current Context");
		console.log("====================");
		console.log(this);

		if (optionalValue) {
			console.log("Value");
			console.log("====================");
			console.log(optionalValue);
		}
	});
	
	// Create application
	var app = new Marionette.Application();
	
	app.addRegions({
		main: '#main'
	});
				
	var router = new Router();
	
	app.on('start', function() {		
		Backbone.history.start();
	});
	
	window.app = app;
	return app; 
});