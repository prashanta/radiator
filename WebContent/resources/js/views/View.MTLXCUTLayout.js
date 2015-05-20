define([
    'backbone',
    'marionette',
    'views/View.RadHeader',
    'views/View.CutOperations',
    'views/View.ActiveOperation',
    'models/Model.StdCutOperations',
    'models/Model.NonStdCutOperations',
    'models/Model.ActiveOperation',
    'templates'
], function(Backbone, Marionette, vRadHeader, vCutOperations, vActiveOperation, mStdCutOperations, mNonStdCutOperations, mActiveOperation, templates){
	return Backbone.Marionette.LayoutView.extend({
		template: templates.mtlxcutLayout,
		tagName: 'div',

		initialize: function(){
			this.options.dataStdOperation= 0;
			this.options.dataNonStdOperation = 0;
			this.options.dataActiveOperation = 0;
		},

		regions:{
			header: "#header",
			stdops: "#std",
			nonstdops: "#nonstd",
			currentop: "#currentop",
      jobCount: "#jobCount"
		},

		ui:{
			header: "#header",
			main: "#row_1",
			row2: "#row_2"
		},

		onBeforeShow: function() {
			// Show child views
			this.header.show(new vRadHeader({title:"CUT WORK CENTER"}));
			this.stdops.show(new vCutOperations({type: 'std', template: templates.stdCutOperations, model: new mStdCutOperations(), meep: "meep1"}));
			this.nonstdops.show(new vCutOperations({type: 'nonstd', template: templates.nonStdCutOperations, model: new mNonStdCutOperations(), meep: "meep2"}));
			this.currentop.show(new vActiveOperation({type: 'active', template: templates.activeOperation, model: new mActiveOperation()}));

		},

		onShow: function(){
			var wHeight = $(window).height();
			this.ui.main.height(wHeight - 52 - 200);
		},

		// Event handler for Child View Fetch Success event
		onChildviewFetchSuccess: function (childView) {
			if(childView.options.type == "std"){
				this.options.dataStdOperation = 1;
			}
			else if(childView.options.type == "nonstd"){
				this.options.dataNonStdOperation = 1;
			}
			this.highlightActiveOperation();
		},

		// Event handler for Child View Fetch Success event
		onChildviewActiveFetched: function (childView, jobNum) {
			/* TODO :
			 * Instead of invoking view's member variable, what about -
			 * 1) Adding active jobs array in the view model (and update that) and have view auto render once it is changed
			 * OR
			 * 2) Use radio instead of function invocation, which looks dirty
			 */

			this.stdops.currentView.highlightActiveOperation(jobNum);
			this.nonstdops.currentView.highlightActiveOperation(jobNum);
		},

		highlightActiveOperation: function(){
			var json = this.currentop.currentView.model.toJSON();
			if(_.size(json) > 0){
        		// Extract active job numbers
        		var jobs = new Array();
        		_.each(json, function(value, key, list){
        			this.push(value.labor.jobNum);
        		}, jobs);
				this.stdops.currentView.highlightActiveOperation(jobs);
				this.nonstdops.currentView.highlightActiveOperation(jobs);
			}
		}
	});
});
