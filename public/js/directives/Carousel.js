(function main($module) {

    "use strict";

    /**
     * @constant INTERVAL_TRANSITION_SECONDS
     * @type {Number}
     */
    var INTERVAL_TRANSITION_SECONDS = 10;

    /**
     * @constant RESUME_TRANSITION_SECONDS
     * @type {Number}
     */
    var RESUME_TRANSITION_SECONDS = 10;

    /**
     * @directive carousel
     */
    $module.directive('carousel', ['$interval', '$timeout', 'mousetrap', function carouselDirective($interval, $timeout, mousetrap) {

        return {

            /**
             * @property restrict
             * @type {String}
             */
            restrict: 'EA',

            /**
             * @property scope
             * @type {Object}
             */
            scope: {
                images: '=ngModel'
            },

            /**
             * @property require
             * @type {String}
             */
            require: 'ngModel',

            /**
             * @property controller
             * @type {Array}
             */
            controller: ['$scope', function controller($scope) {

                /**
                 * @method getImage
                 * @param {Array} image
                 * @return {Array}
                 */
                $scope.getImage = function getImage(image) {
                    return typeof image === 'object' ? image.src : image;
                };

                /**
                 * @property current
                 * @type {Number}
                 */
                $scope.current = 0;

                /**
                 * @property userIntervention
                 * @type {Boolean}
                 */
                $scope.userIntervention = false;

                /**
                 * @property interval
                 * @type {{cancel: *}}
                 */
                $scope.interval = { cancel: angular.noop };

                /**
                 * @property timeout
                 * @type {{cancel: *}}
                 */
                $scope.timeout = { cancel: angular.noop };

                /**
                 * @method setIndex
                 * @param {Number} current
                 * @return {void}
                 */
                $scope.setIndex = function setIndex(current) {

                    $scope.current = current;

                    if ($scope.current >= $scope.images.length) {
                        $scope.current = 0;
                    }

                    if ($scope.current < 0) {
                        $scope.current = $scope.images.length - 1;
                    }

                };

                /**
                 * @method startTransitioning
                 * @return {void}
                 */
                $scope.startTransitioning = function startTransitioning() {

                    $scope.interval = $interval(function interval() {

                        $scope.setIndex($scope.current + 1);

                    }, (INTERVAL_TRANSITION_SECONDS * 1000));

                };

                /**
                 * @method forceIndex
                 * @param {Number} index
                 * @return {void}
                 */
                $scope.forceIndex = function forceIndex(index) {

                    $scope.userIntervention = true;

                    $interval.cancel($scope.interval);
                    $timeout.cancel($scope.timeout);

                    $scope.setIndex(index);

                    $scope.timeout = $timeout(function timeout() {

                        $scope.userIntervention = false;
                        $scope.startTransitioning();

                    }, (RESUME_TRANSITION_SECONDS * 1000));

                };

            }],

            /**
             * @property replace
             * @type {Boolean}
             */
            replace: true,

            /**
             * @property template
             * @type {String}
             */
            templateUrl: 'partials/carousel.html',

            /**
             * @method link
             * @param {Object} scope
             * @return {void}
             */
            link: function link(scope) {

                // Begin the transition process!
                scope.startTransitioning();

                // Add keyboard event listeners.

                mousetrap.bind('left', function leftKey() {
                    scope.forceIndex(scope.current - 1);
                    scope.$apply();
                });

                mousetrap.bind('right', function rightKey() {
                    scope.forceIndex(scope.current + 1);
                    scope.$apply();
                });

            }

        };

    }]);

})(window.angular.module(APP_NAME));