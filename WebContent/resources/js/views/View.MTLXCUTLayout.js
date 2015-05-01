define([
    'backbone',
    'marionette',    
    'templates'
], function(Backbone, Marionette, templates){
	return Backbone.Marionette.LayoutView.extend({
		template: templates.mtlxcutLayout,
		tagName: 'div',
		
		initialize: function(){
			this.options.dataStdOperation= 0;
			this.options.dataNonStdOperation = 0;
			this.options.dataActiveOperation = 0;
		},
		
		ui:{
			header: "#header", 
			main: "#row_1",
		},
		
		regions:{
			header: "#header",
			stdops: "#std",
			nonstdops: "#nonstd",
			currentop: "#currentop"				
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
			this.stdops.currentView.highlightActiveOperation(jobNum);
			this.nonstdops.currentView.highlightActiveOperation(jobNum);
		},
		
		highlightActiveOperation: function(){
			if(this.currentop.currentView.model.has("labor")){
				var jobNum = this.currentop.currentView.model.get("labor").jobNum;			
				if(jobNum){				
					this.stdops.currentView.highlightActiveOperation(jobNum);
					this.nonstdops.currentView.highlightActiveOperation(jobNum);			
				}
			}
		}
	});
});