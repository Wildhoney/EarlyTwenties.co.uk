(function($process) {

    "use strict";

    /**
     * @constant FLICKR
     * @type {Object}
     */
    var FLICKR = {

        /**
         * @property API_KEY
         * @type {String}
         */
        API_KEY: '97eb4ffb00fcfdd994822aa3734ee16b',

        /**
         * @property USER_ID
         * @type {String}
         */
        USER_ID: '24566834@N06',

        /**
         * @constant BACKGROUND_URL
         * @type {String}
         */
        BACKGROUND_URL: 'https://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_b.jpg'

    };

    var express  = require('express'),
        app      = express(),
        server   = require('http').createServer(app),
        Flickr   = require('flickrapi'),
        Mustache = require('Mustache'),
        images   = { backdrop: [], portfolio: []},
        options  = {
            api_key: FLICKR.API_KEY,
            secret: $process.env.FLICKR_SECRET
        };

    app.use(express.static(__dirname + '/..'));

    app.get('/images/backdrop', function(request, response) {
        response.send(JSON.stringify(images.backdrop));
    });

    app.get('/images/portfolio', function(request) {
        response.send(JSON.stringify(images.portfolio));
    });

    server.listen($process.env.PORT || 5000);

    Flickr.tokenOnly(options, function(error, flickr) {

        // Retrieve the images from our Flickr account...
        flickr.photos.search({ user_id: FLICKR.USER_ID, page: 1, per_page: 2 }, function results(error, result) {

            images.backdrop = result.photos.photo.map(function map(model) {
                return Mustache.render(FLICKR.BACKGROUND_URL, model);
            });

        });

    });

})(process);