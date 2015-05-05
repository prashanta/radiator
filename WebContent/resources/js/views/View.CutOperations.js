define([
    'backbone',
    'marionette',
    'templates'
], function(Backbone, Marionette, templates){
	return Marionette.ItemView.extend({
		tagName: 'div',
		
		firstRun : false,
		updateInterval: 600000, // 10 minutes
		timer: null,

		/**
    	 * UI bindings
    	 */
		ui:{
			badge : ".badge",
			netstatRun: ".netstat-run",
			netstatError: ".netstat-error"
		},
		
		/**
    	 * Initialize
    	 */
		initialize : function () {
			this.listenTo(this.model, 'successOnFetch', this.handleSuccess);
	        this.listenTo(this.model, 'errorOnFetch', this.handleError);
	        this.listenTo(this, 'getdata', this.getData);
        },
        
        /**
    	 * Get data from server
    	 */
        getData: function(){
        	this.ui.netstatRun.show();
        	this.ui.netstatError.hide();
        	this.model.fetch({ 
				success : function(model, response, options){
					model.trigger("successOnFetch");
				},
				error: function(model, response, options){
					model.trigger('errorOnFetch');
				}				
			});
        },       
        
        /**
    	 * Handle data after successful REST request
    	 */
        handleSuccess: function (options) {
        	this.ui.netstatRun.hide();
            this.render();            
            // Show total operations inside badge
            this.ui.badge.html(_.size(this.model.attributes));
            this.triggerMethod("fetch:success");            
            this.highlightOverDueOperations();
        },
        
        /**
    	 * Error handle after unsuccessful REST request
    	 */
        handleError: function (options) {
        	this.ui.netstatError.show();
        	this.ui.netstatRun.hide();
        	this.getData();
        },
        
        /**
    	 * On render
    	 */
        onRender: function(){
        	this.$el = this.$el.children();
            this.$el.unwrap();                       
            this.setElement(this.$el);    
            
            this.ui.netstatRun.hide();
			this.ui.netstatError.hide();
			
			var t = this;
			// get data manually for first time
			if(t["firstRun"] == false){
				this.getData();
				t["firstRun"] = true;
			}
			// for rest of the times get data in regular intervals
			else
				this.startTimer();
        },
        
        /**
    	 * Highlight active operation
    	 */
        highlightActiveOperation: function(jobs){
        	_.each(jobs, function(jobNum, index ){
        		// first unhighlight if overdue
        		$("td:contains('"+jobNum+"')", this.$el).removeClass("highlight-red");
        		$("tr:contains('"+jobNum+"')", this.$el).addClass("highlight-green");
        	}, this);
        },
        
        /**
    	 * Un-Highlight active operation
    	 */
        unhighlightActiveOperation: function(){        	
        	$("tr:.highlight-active-operation", this.$el).removeClass("highlight-green");
        },
        
        /**
    	 * Highlight over due operations
    	 */
        highlightOverDueOperations: function(){
        	var data = this.model.clone();
        	_.each(data.attributes, function(val){
        		var dueDate = new Date(val.dueDate);
        		var now = new Date();
        		if(now > dueDate){
        			$("td:contains('"+val.jobNum+"')", this.$el).addClass("highlight-red");
        		}
        	}, this);
        },
        
        /**
    	 *	Start timer 
    	 */
        startTimer: function(){
        	var t = this;
        	if(t["timer"] == null)        		
        		t["timer"] = TimersJS.timer(t["updateInterval"], function(){ t.trigger("getdata"); });
        	else
        		t["timer"].restart();
        }
	});
});