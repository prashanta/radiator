define([
        'backbone', 
        'marionette', 
        'handlebars',
        'radiator',
        'views/View.RadHeader',
        'views/View.MTLXCUTLayout',
        'views/View.CutOperations',
        'views/View.ActiveOperation',        
        'models/Model.StdCutOperations',        
        'models/Model.NonStdCutOperations',        
        'models/Model.ActiveOperation',
        'route',
        'templates'
        ], function(Backbone, Marionette, Handlebars, Radiator, vRadHeader, vMTLXCUTLayout, vCutOperations, vActiveOperation, mStdCutOperations, mNonStdCutOperations, mActiveOperation, Router, templates){

	// Replace underscore.js with handlebars.js template complier 
	Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
		return Handlebars.compile(rawTemplate);        
	};
	
	// Create application
	var app = new Radiator();
	
	var header = new vRadHeader({title:"CUT WORK CENTER"});
	
	// CUT OPERATION layout view 
	var mtlxcut = new vMTLXCUTLayout();
	app.main.show(mtlxcut);
	mtlxcut.header.show(header);
	mtlxcut.stdops.show(new vCutOperations({type: 'std', template: templates.stdCutOperations, model: new mStdCutOperations()}));
	mtlxcut.nonstdops.show(new vCutOperations({type: 'nonstd', template: templates.nonStdCutOperations, model: new mNonStdCutOperations()}));
	mtlxcut.currentop.show(new vActiveOperation({type: 'active', template: templates.activeOperation, model: new mActiveOperation()}));
	
	var router = new Router();
	
	app.on('start', function() {		
		Backbone.history.start();
	});
	
	window.app = app;
	return app; 
});