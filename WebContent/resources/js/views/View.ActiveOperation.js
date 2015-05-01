define([
    'backbone',
    'marionette',
    'templates'
], function(Backbone, Marionette, templates){
	return Marionette.ItemView.extend({
		tagName: 'div',
		
		firstRun : true,
		
		updateInterval: 300000, // 5 minutes
		timer: null,
		
		lapseInterval: 60000, // 1 minute
		lapseTimer: null,
		
		/**
    	 * UI bindings
    	 */
		ui:{
			badge : ".badge",
			lapse: "#lapse",
			jobNum: "#jobNum",
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
	        this.listenTo(this, 'updatelapse', this.printLapseTime);	        
        },
        
        /**
    	 * Get data from server
    	 */
        getData: function(){
        	this.ui.netstatRun.show();
        	this.ui.netstatError.hide();
        	// Pause lapse timer
        	this.pauseLapseTimer();
        	// Get data from server
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
        handleSuccess: function (options){
        	this.ui.netstatRun.hide();
        	var oper = this.model.get("oper");
        	if(oper != null){
        		// render view
        		this.render();	
        		this.triggerMethod("active:fetched", oper.jobNum);
        		// Print lapse time
        		this.printLapseTime();
        		// Start lapse timer
        		this.startLapseTimer();
        	}
        	else{        		
        		this.ui.jobNum.html("NO ACTIVE JOB");
        		this.startTimer();
        	}
        	
        },
        
        /**
    	 * Error handle after unsuccessful REST request
    	 */
        handleError: function (options) {
        	this.ui.netstatError.show();
        	this.ui.netstatRun.hide();
        	//this.startTimer();
        	this.getData();	
        },
        
        /**
    	 * On render
    	 */
        onRender: function(){
        	// Jumping hoops to remove DIV element 
        	this.$el = this.$el.children();
            this.$el.unwrap();                       
            this.setElement(this.$el);
            
            this.ui.netstatRun.hide();
			this.ui.netstatError.hide();
						
			var t = this;
			// get data manually for first time
			if(t["firstRun"] == true){
				this.getData();
				t["firstRun"] = false;
			}
			// for rest of the times get data in regular intervals
			else
				this.startTimer();
        },
        
        printLapseTime: function(){
        	var lapse = this.model.getTimeLapse();
    		this.ui.lapse.html(lapse[0] + " DAYS, " + lapse[1] + " HRS, " + lapse[2] + " MINS");
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
        },
        
        startLapseTimer: function(){
        	var t = this;
        	if(t["lapseTimer"] == null)        		
        		t["lapseTimer"] = TimersJS.repeater(t["lapseInterval"], function(){ t.trigger("updatelapse"); });        	
        	else
        		t["lapseTimer"].restart();
        },
        
        pauseLapseTimer: function(){
        	var t = this;
        	if(t["lapseTimer"] != null)
        		t["lapseTimer"].pause();
        }
	});
});