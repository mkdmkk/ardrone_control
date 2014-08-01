/**
 * A class for recording drone's camera view
 *
 * @param droneClient
 * @returns {{start: start, stop: stop, test: test}}
 * @constructor
 */
module.exports.DroneCameraRecorder = function (droneClient) {
    var fs = require('fs');

    var path = 'public/media/record.h264';
    var mp4Path = 'public/media/record.mp4';

    var isStarted = false;
    var output;
    var mp4Output;

    var parser = new (require('../node_modules/ar-drone/lib/video/PaVEParser'))();
    parser.on('data', function (data) {
        if(isStarted) {
            output.write(data.payload);
        }
    }).on('end', function () {
        console.log("OUTPUT Ended.");
    });

//    var video = droneClient.getVideoStream();
//    video.pipe(parser);
//    video.on('close', function() {
//        console.log("[DroneCameraRecorder] Camera reconnected.");
//        video.end();
//        delete video;
//        video = droneClient.getVideoStream();
//    });
//
    /**
     * To convert h264 video to mp4
     */
    function transcode() {
        mp4Output = fs.createWriteStream(mp4Path);
        new (require('stream-transcoder'))(fs.createReadStream(path))
            .maxSize(1280, 720)
            .videoCodec('h264')
            .videoBitrate(800 * 1000)
            .fps(25)
            .sampleRate(44100)
            .channels(2)
            .audioBitrate(128 * 1000)
            .format('mp4')
            .on('finish', function() {
                console.log("[DroneCameraRecorder] Transcoding finished.");
            })
            .stream().pipe(mp4Output);
    }

    var self = {
        start: function () {
            console.log("[DroneCameraRecorder] Recording started.");
            output = fs.createWriteStream(path);
            isStarted = true;
        },
        stop: function () {
            console.log("[DroneCameraRecorder] Recording stopped.");
            isStarted = false;
            output.end();

            transcode();
        },
        test: function() {
            self.start();
            setTimeout(function () {
                self.stop();
            }, 5000);
        }
    };
    return self;
};