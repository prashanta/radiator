require.config({
    
    paths:{        
        jquery: '../libs/jquery.min',                
        bootstrap: '../libs/bootstrap/js/bootstrap.min',                
        underscore: '../libs/underscore',
        handlebars: '../libs/handlebars.min',
        backbone: '../libs/backbone',
        marionette: '../libs/backbone.marionette.min',
        text: '../libs/text',
        timers: '../libs/timers'
    },   
    shim:{
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore', 'handlebars']
        },
        marionette: {
            exports: 'Marionette',
            deps: ['backbone']
        },      
        handlebars: {
            exports: 'Handlebars'
        },        
        bootstrap: {            
            deps: ['jquery']
        }
    },
    deps: ['jquery', 'underscore', 'handlebars', 'bootstrap', 'timers']    
});

require(['app'], function(App){    
    App.start(); 
});