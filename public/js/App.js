(function main($window, $angular, $mousetrap) {

    "use strict";

    /**
     * @constant APP_NAME
     * @type {String}
     */
    $window.APP_NAME = 'earlyTwentiesApp';

    // Only the children know what they are looking for.
    $angular.module(APP_NAME, []).service('mousetrap', function addMousetrap() {
        return $mousetrap;
    });

})(window, window.angular, window.Mousetrap);