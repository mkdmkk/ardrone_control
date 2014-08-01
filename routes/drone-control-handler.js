/**
 * Created by mkk on 7/31/14.
 */
module.exports.DroneControlHandler = function(droneController) {
    var actions = {
        "takeoff": droneController.takeoff,
        "land": droneController.land
    };

    return {
        handle: function (req, res) {
            if (req.method == 'GET') {
                if (req.query.hasOwnProperty("action") && actions.hasOwnProperty(req.query.action)) {
                    actions[req.query.action]();
                }
            }
        }
    };
};