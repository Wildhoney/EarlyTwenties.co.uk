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
        BACKGROUND_URL: 'https://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_b.jpg',

        /**
         * @constant MAX_IMAGES
         * @type {Number}
         */
        MAX_IMAGES: 10,

        /**
         * @constant BACKGROUND_PHOTOSET
         * @type {String}
         */
        BACKGROUND_PHOTOSET: '72157651074972725',

        /**
         * @constant PORTFOLIO_PHOTOSET
         * @type {String}
         */
        PORTFOLIO_PHOTOSET: '72157651074972725'

    };

    var express  = require('express'),
        app      = express(),
        server   = require('http').createServer(app),
        Flickr   = require('flickrapi'),
        mustache = require('mustache'),
        images   = { backdrop: [], portfolio: []},
        options  = {
            api_key: FLICKR.API_KEY,
            secret: $process.env.FLICKR_SECRET
        };

    app.use(express.static(__dirname + '/..'));

    app.get('/images/backdrop', function(request, response) {
        response.send(JSON.stringify(images.backdrop));
    });

    app.get('/images/portfolio', function(request, response) {
        response.send(JSON.stringify(images.portfolio));
    });

    // Voila! Listen for requests!
    server.listen($process.env.PORT || 5000);

    Flickr.tokenOnly(options, function(error, flickr) {

        var backdropOptions  = { user_id: FLICKR.USER_ID, page: 1, per_page: FLICKR.MAX_IMAGES, photoset_id: FLICKR.BACKGROUND_PHOTOSET},
            portfolioOptions = { user_id: FLICKR.USER_ID, page: 1, per_page: 1000, photoset_id: FLICKR.PORTFOLIO_PHOTOSET };

        // Retrieve the images from our Flickr account...

        flickr.photosets.getPhotos(backdropOptions, function results(error, result) {
            images.backdrop = result.photoset.photo.map(function map(model) {
                return { label: model.title, src: mustache.render(FLICKR.BACKGROUND_URL, model) };
            });
        });

        flickr.photosets.getPhotos(portfolioOptions, function results(error, result) {
            images.portfolio = result.photoset.photo.map(function map(model) {
                return { label: model.title, src: mustache.render(FLICKR.BACKGROUND_URL, model) };
            });
        });

    });

})(process);