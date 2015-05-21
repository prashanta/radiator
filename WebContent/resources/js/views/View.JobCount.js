define([
  'backbone',
  'marionette',
  'rickshaw',
  'templates'
], function(Backbone, Marionette, Rickshaw, templates){
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
        netstatRun: ".netstat-run",
        netstatError: ".netstat-error",
        graph: "#jobs",
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
        var json = this.model.toJSON();
        // console.log(json);

        if(_.size(json) > 0){
          console.log("View.JobCount: rendering view");
          // Render view
          this.render();

          this.startLapseTimer();
        }
        else{
          //this.ui.jobNum.html("NO ACTIVE JOB");
          this.startTimer();
        }

      },

      /**
      * Error handle after unsuccessful REST request
      */
      handleError: function (options) {
        this.ui.netstatError.show();
        this.ui.netstatRun.hide();
        this.startTimer();
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
        else             // for rest of the times get data in regular intervals
          this.startTimer();
          var data1 = [ { x: 0, y: 20 }, { x: 1, y: 49 }, { x: 2, y: 38 }, { x: 3, y: 30 }, { x: 4, y: 32 } ];
          console.log(data1);
          console.log(this.model);
          var graph = new Rickshaw.Graph({
            width: 600,
            height: 110,
            element: this.ui.graph.get(0),
            renderer: 'lineplot',
            padding: { top: 0.1 },
            series: [
            {
              data: data1,
              color: 'steelblue',
              name: "blue",
            }, {
              data: [ { x: 0, y: 19 }, { x: 1, y: 22 }, { x: 2, y: 32 }, { x: 3, y: 20 }, { x: 4, y: 21 } ],
              color: 'lightblue',
              name: "light blue"
            }
            ]
          } );

          graph.render();

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
            t["lapseTimer"] = TimersJS.repeater(t["lapseInterval"], function(){
                // t.trigger("updatelapse");
              });
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
