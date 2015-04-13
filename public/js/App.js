(function main($window, $angular, $mousetrap) {

    "use strict";

    /**
     * @constant APP_NAME
     * @type {String}
     */
    $window.APP_NAME = 'earlyTwentiesApp';

    // Only the children know what they are looking for.
    var app = $angular.module(APP_NAME, ['ngRoute']).service('mousetrap', function addMousetrap() {
        return $mousetrap;
    });

    app.config(['$routeProvider', function routerProvider($routeProvider) {

        $routeProvider.
            when('/about.html', {
                templateUrl: 'views/about.html'
            }).
            when('/portfolio.html', {
                templateUrl: 'views/portfolio.html'
            }).
            otherwise({
                redirectTo: '/'
            });

    }]);

})(window, window.angular, window.Mousetrap);