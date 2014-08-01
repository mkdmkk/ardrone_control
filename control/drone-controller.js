/**
 * Drone Controller
 *
 * @param droneClient
 * @returns {{handle: handle, turnOnGPS: turnOnGPS, returnToHome: returnToHome}}
 * @constructor
 *
 * @author Moon Kwon Kim (mkdmkk@gmail.com)
 * @since 2014.07.31
 */
module.exports.DroneController = function (droneClient) {
    var startingLocation;
    var currentLocation;

    var self = {
        turnOnGPS: function() {
            // Turn on a navigation data listener
            droneClient.on('navdata', function (navdata) {
                if(navdata.hasOwnProperty("gps")) {
                    console.log(navdata.gps);
                }
            });
        },
        returnToHome: function() {
            if(startingLocation != undefined && startingLocation != null) {

            }
        }
    };
    return self;
};
