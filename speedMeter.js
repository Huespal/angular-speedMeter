(function( window, angular, undefined ) {
    'use strict';

        angular
            .module('speedMeter', [])
            .service('$speedMeter', [function(){

                //TODO: Custom image
                var imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg",
                    downloadSize = 4995374, //bytes
                    results = {};

                /**
                 * Mesures connection speed
                 * @returns {{}} Speed in bytes, Kilobytes and Megabytes.
                 */
                this.measureConnectionSpeed = function () {
                    var startTime, endTime;
                        download = new Image();

                    download.onload = function () {
                        endTime = (new Date()).getTime();
                        showResults();
                    };

                    download.onerror = function (err, msg) {
                        console.log('Error: ', err, msg);
                    };

                    startTime = (new Date()).getTime();
                    var cacheBuster = "?nnn=" + startTime;
                    download.src = imageAddr + cacheBuster;

                    function showResults() {
                        var duration = (endTime - startTime) / 1000,
                            bitsLoaded = downloadSize * 8,
                            speedBps = (bitsLoaded / duration).toFixed(2),
                            speedKbps = (speedBps / 1024).toFixed(2),
                            speedMbps = (speedKbps / 1024).toFixed(2);
                        results = {
                            speedBps: speedBps,
                            speedKbps: speedKbps,
                            speedMbps: speedMbps
                        };
                    }

                    return results;
                }

            }]);
}(window, window.angular ));
