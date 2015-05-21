require.config({

    paths:{
        jquery: '../libs/jquery.min',
        bootstrap: '../libs/bootstrap/js/bootstrap.min',
        underscore: '../libs/underscore',
        handlebars: '../libs/handlebars.min',
        backbone: '../libs/backbone',
        marionette: '../libs/backbone.marionette.min',
        text: '../libs/text',
        timers: '../libs/timers',
        d3: '../libs/d3.v3.min',
        rickshaw: '../libs/rickshaw.min'
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
        },
        rickshaw: {
            deps:['d3']
        }
    },
    deps: ['jquery', 'underscore', 'handlebars', 'bootstrap', 'timers', 'd3']
});

require(['app'], function(App){
    App.start();
});
