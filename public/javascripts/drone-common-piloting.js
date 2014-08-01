/**
 * A class for common features of piloting
 *
 * @returns {{playRecord: playRecord}}
 * @constructor
 */
function CommonPilotingController() {
    var streamingSurface = document.getElementById("streaming");
    new NodecopterStream(streamingSurface);

    var self = {
        playRecord: function () {
            $("#record").attr('src', "http://localhost:3000/media/record.mp4");
            $.ajax({
                url: SERVER_URL + "/api/video?action=getPath",
                type: 'GET'
            }).done(function(res) {

            });
        }
    };
    return self;
}
