var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {HTMLViewer}
 */
var HTMLViewer = AbstractComponent.extend({
    toString: 'HTMLViewer',

    construct: function () {
        this.triggerMsgReceived = function () { /* noop */ };
    },

    in_in: function (msg) {
        this.triggerMsgReceived(msg);
    },

    onMsgReceived: function (handler) {
        this.triggerMsgReceived = handler;
    },

    uiController: function() {
        return ['$scope', '$sce', '$timeout', 'instance', function($scope, $sce, $timeout, instance) {
            instance.onMsgReceived(function (msg) {
                $timeout(function () {
                    $scope.html = $sce.trustAsHtml(msg);
                });
            });
        }];
    }
});

module.exports = HTMLViewer;
