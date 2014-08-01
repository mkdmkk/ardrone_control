/**
 * Created by mkk on 7/31/14.
 */
module.exports.DroneVideoHandler = function(droneCameraRecorder) {
    var actions = {
        getPath: function() { return "path" }
    };

    return {
        handle: function (req, res) {
            if (req.method == 'GET') {
                if (req.query.hasOwnProperty("action") && actions.hasOwnProperty(req.query.action)) {
                    var out = actions[req.query.action]();
                    res.send(out);
                } else {
                    response.writeHead(404, {"Content-Type": "text/plain"});
                    response.send("Invalid Request");
                }
            }
        }
    };
};