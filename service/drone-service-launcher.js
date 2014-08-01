/**
 * Created by mkk on 7/31/14.
 */

module.exports.DroneServiceLauncher = function () {
    var STREAMING_PORT = 3001;
    var FRAME_RATE = 16;

    var droneClient;
    var droneControl;
    var droneCameraStreamer;

    var self = {
        init: function(app) {
            // Prepare drone controlling service
            droneClient = require('ar-drone').createClient({frameRate: FRAME_RATE});
            console.log("[DroneServiceLauncher] Drone client created.");

            if (droneClient != null) {
                // Initialize drone controller
                droneControl = new (require('../control/drone-controller').DroneController)(droneClient);
                console.log("[DroneServiceLauncher] Drone controller initialized.");

                // Initialize drone camera streamer
                droneCameraStreamer = new (require('../control/drone-camera-streamer').DroneCameraStreamer)(droneClient);
                console.log("[DroneServiceLauncher] Drone camera streamer initialized.")

                // Initialize drone camera recorder
                droneCameraRecorder = new (require('../control/drone-camera-recorder').DroneCameraRecorder)(droneClient);
                console.log("[DroneServiceLauncher] Drone camera recorder initialized.")
            }

            var express = require('express');
            var router = express.Router();

            // Enable Web App
            var pageRenderer = new (require('../routes/page-renderer').PageRenderer)();
            router.get('/', pageRenderer.index);
            router.get('/auto', pageRenderer.auto);
            router.get('/manual', pageRenderer.manual);
            console.log("[DroneServiceLauncher] Web app enabled.");

            // Enable APIs
            var droneControlHandler = new (require('../routes/drone-control-handler').DroneControlHandler)(droneClient);
            var droneStreamingHandler = new (require('../routes/drone-streaming-handler').DroneStreamingHandler)(droneClient);
            var droneVideoHandler = new (require('../routes/drone-video-handler').DroneVideoHandler)(droneClient);
            router.get('/api/control', droneControlHandler.handle);
            router.get('/api/streaming', droneStreamingHandler.handle);
            router.get('/api/video', droneVideoHandler.handle);
            console.log("[DroneServiceLauncher] APIs enabled.");

            app.use('/', router);
        },
        launch: function(server) {
            droneCameraStreamer.start(server);
        }
    };
    return self;
}
