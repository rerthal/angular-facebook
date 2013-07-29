/**
* Copyright (C) 2013 Rafael Almeida Erthal Hermano
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
* General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see http://www.gnu.org/licenses/.
*/
(function () {
    'use strict';

    var queue = [],
        ready = false;

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
        var i;
        for (i = 0; i < queue.length; i++) {
            queue[i]();
        }
        ready = true;
    };

    function handler (fn) {
        if (ready) {
            return fn();
        }
        queue.push(fn);
    }

    angular
    .module('facebook', [])
    .provider('$facebook', function () {
        var module = {
            init : function (params) {
                return handler(function () {
                    return FB.init(params);
                });
            },
            api : function (path, method, params, cb) {
                return handler(function () {
                    return FB.api(path, method, params, cb);
                });
            },
            ui : function (params, cb) {
                return handler(function () {
                    return FB.ui(params, cb);
                });
            },
            Event : {
                subscribe : function (name, cb) {
                    return handler(function () {
                        return FB.Event.subscribe(name, cb);
                    });
                },
                unsubscribe : function (name, cb) {
                    return handler(function () {
                        return FB.Event.unsubscribe(name, cb);
                    });
                },
            },
            getAuthResponse : function () {
                return handler(function () {
                    return FB.Event.getAuthResponse();
                });
            },
            getLoginStatus : function (cb, force) {
                return handler(function () {
                    return FB.getLoginStatus(cb, force);
                });
            },
            login : function (cb, opts) {
                return handler(function () {
                    return FB.login(cb, opts);
                });
            },
            logout : function (cb) {
                return handler(function () {
                    return FB.logout(cb);
                });
            },
            Canvas : {
                hideFlashElement : function (elem) {
                    return handler(function () {
                        return FB.Canvas.hideFlashElement(elem);
                    });
                },
                scrollTo : function (params) {
                    return handler(function () {
                        return FB.Canvas.scrollTo(params);
                    });
                },
                setAutoGrow : function (onOrOff, interval) {
                    return handler(function () {
                        return FB.Canvas.setAutoGrow(onOrOff, interval);
                    });
                },
                setDoneLoading : function (callback) {
                    return handler(function () {
                        return FB.Canvas.setDoneLoading(callback);
                    });
                },
                setSize : function (params) {
                    return handler(function () {
                        return FB.Canvas.setSize(params);
                    });
                },
                setUrlHandler : function (callback) {
                    return handler(function () {
                        return FB.Canvas.setUrlHandler(callback);
                    });
                },
                showFlashElement : function (elem) {
                    return handler(function () {
                        return FB.Canvas.showFlashElement(elem);
                    });
                },
                startTimer : function () {
                    return handler(function () {
                        return FB.Canvas.startTimer();
                    });
                },
                stopTimer : function (callback) {
                    return handler(function () {
                        return FB.Canvas.stopTimer(callback);
                    });
                }
            }
        };

        return {
            $get: function () {
                return module;
            },
            init : module.init,
            api : module.api,
            ui : module.ui,
            Event : module.Event,
            getAuthResponse : module.getAuthResponse,
            getLoginStatus : module.getLoginStatus,
            login : module.login,
            logout : module.logout,
            Canvas : module.canvas
        }
    });
}).call();
