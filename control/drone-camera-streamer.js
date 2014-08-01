/**
 * Created by mkk on 7/31/14.
 */

module.exports.DroneCameraStreamer = function(droneClient) {
    var self = {
        start: function(server) {
//            require('ar-drone-png-stream')(droneClient, {port: port, frameRate: 16});
            require('dronestream').listen(server);
        },
        stop: function() {

        }
    };
    return self;
};