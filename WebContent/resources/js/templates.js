define(function (require) {
	'use strict';
	return {
		radHeader: require('text!templates/RadHeader.tmpl'),
		mtlxcutLayout: require('text!templates/mtlxcutLayout.tmpl'),
		stdCutOperations: require('text!templates/stdCutOperations.tmpl'),
		nonStdCutOperations: require('text!templates/nonStdCutOperations.tmpl'),
		activeOperation: require('text!templates/activeOperation.tmpl')
	};
});