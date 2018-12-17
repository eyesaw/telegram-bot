"use strict";
exports.__esModule = true;
var Request = require("request");
var Jsdom = require("jsdom");
var Promise = require("promise");
var File_Crawler = /** @class */ (function () {
    function File_Crawler(config) {
        this.config = config;
        // container for the returned image list
        this.image_source_list = [];
    }
    ;
    //Initilize the async request
    File_Crawler.prototype.init = function () {
        var _ = this;
        return new Promise(function (resolve, reject) {
            new Request(_.config.url + _.config.directory, function (error, response, body) {
                if (error === null && (response && response.statusCode == 200)) {
                    _.parse(body);
                    resolve();
                }
                else {
                    throw new Error('[!] Could not retrive url: ' + error);
                    reject();
                }
            });
        });
    };
    // search for all images which fits the file pattern
    File_Crawler.prototype.parse = function (body) {
        var HTML_document = new Jsdom.JSDOM(body);
        switch (this.config.query_type) {
            case 'img_src':
                var HTML_images_elements = HTML_document.window.document.querySelectorAll("img");
                for (var i = 0; i < HTML_images_elements.length; i++) {
                    // validate
                    if (this.validate(HTML_images_elements[i].src)) {
                        // add to list
                        this.image_source_list.push(HTML_images_elements[i].src);
                    }
                }
                break;
            //// TODO:  add regex functionality
            case 'regex':
                break;
        }
    };
    // validate the strings
    File_Crawler.prototype.validate = function (url) {
        if (!this.config.file_pattern) {
            return url;
        }
        switch (this.config.query_type) {
            case 'img_src':
                return url.includes(this.config.file_pattern) ? url : false;
                break;
            case 'regex':
                return false;
                break;
        }
    };
    // return the requested image/s by count
    File_Crawler.prototype.output = function () {
        if (this.image_source_list) {
            if (this.image_source_list.length < this.config.count) {
                return this.image_source_list;
            }
            else {
                return this.image_source_list.slice(0, this.config.count);
            }
        }
        else {
            throw new Error('[!] Could not recive anything');
        }
    };
    return File_Crawler;
}());
exports["default"] = File_Crawler;
