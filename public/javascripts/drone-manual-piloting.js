/**
 * Created by mkk on 7/23/14.
 */

/**
 * A class for controlling a drone manually
 * @param client A drone controller of NodeCopter
 * @returns {{takeOff: takeOff, land: land, move: move, stop: stop}}
 * @constructor
 */
function ManualPilotingController(client, streamingHandler) {
    var isFlaying = false;

    var self = {
        takeOff: function (delay) {
            client.takeOff(function() {
                isFlaying = true;
            });
        },
        land: function() {
            client.land(function() {
                isFlaying = false;
            });
        },
        move: function (action, speed, delay, duration) {
            if(delay != undefined && delay > 0) {
                client.after(delay, null);
            }

            switch(action) {
                case "up":
                    client.up(speed);
                    break;
                case "down":
                    client.down(speed);
                    break;
                case "front":
                    client.front(speed);
                    break;
                case "back":
                    client.back(speed);
                    break;
                case "left":
                    client.left(speed);
                    break;
                case "right":
                    client.right(speed);
                    break;
                case "clockwise":
                    client.clockwise(speed);
                    break;
                case "counterClockwise":
                    client.counterClockwise(speed);
                    break;
                default:
                    client.stop();
                    break;
            }

            if(duration != undefined && duration > 0) {
                client.after(duration, function() {
                    this.stop();
                });
            }
        },
        stop: function() {
            client.stop();
        }
    }
    return self;
}
