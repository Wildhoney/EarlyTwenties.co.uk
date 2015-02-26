(function main($module) {

    "use strict";

    /**
     * @controller ApplicationController
     */
    $module.controller('ApplicationController', ['$scope', function ApplicationController($scope) {

        /**
         * @property images
         * @type {String[]}
         */
        $scope.images = [
            'http://cs319722.vk.me/v319722766/2b7f/lISXBOAD6MM.jpg',
            'http://cs319723.vk.me/v319723766/2615/GQu5PXub_Xg.jpg',
            'http://cs418229.vk.me/v418229766/6638/32G_zaHuX48.jpg',
            'http://cs306303.vk.me/v306303766/1ee5/KfhQK52zqLA.jpg',
            'http://cs10492.vk.me/u6518766/153771043/z_09bdf135.jpg',
            'http://cs306302.vk.me/v306302766/310a/JY_VMFRMbYo.jpg',
            'http://cs306302.vk.me/v306302766/31be/PdboW-kRjxY.jpg',
            'http://cs306302.vk.me/v306302766/319a/6aZuRRZ5Nsg.jpg',
            'http://cs10423.vk.me/u6518766/142459853/z_6e651577.jpg',
            'http://cs619918.vk.me/v619918766/b8a1/Axc_25E9338.jpg',
            'http://cs613526.vk.me/v613526766/1100a/ErRWWdE1CHs.jpg',
            'http://cs412429.vk.me/v412429766/1c5b/K3uLKmdPSoM.jpg',
            'http://cs419516.vk.me/v419516766/a521/E0Ndxx-K4Kc.jpg',
            'http://cs412429.vk.me/v412429766/1c7f/UaVt2zv5FrQ.jpg',
            'http://cs314217.vk.me/v314217766/64a5/F52F7nEogpI.jpg',
            'http://cs314428.vk.me/v314428766/6c6a/7wY0Suskv9o.jpg',
            'http://cs621125.vk.me/v621125766/a349/1-cveMkZXE4.jpg',
            'http://cs621125.vk.me/v621125766/a52f/2s9Q3XU8bVY.jpg'
        ];

    }]);

})(window.angular.module(APP_NAME));