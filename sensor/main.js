/**
 * Main script
 */

// import libraries
var raspiIoLibrary = require('raspi-io');
var fiveLibrary = require('johnny-five');
var request = require('request');

/* all scope var: temp and bar sensors (unique) and pin*/
var relayPin1 = 7;
var relayPin2 = 0;
var temp, bar, relay1, relay2; // undefined for now

/* setup board*/
var board = new fiveLibrary.Board({
    io: new raspiIoLibrary()
});

board.on('ready', function () {

    /**read temperature data every 5 sec. */
    temp = new fiveLibrary.Thermometer({
        controller: "BMP180", // ic2 protocol, no more pins required
        freq: 5000
    });

    temp.on("change", function (data, err) {
        if (err) {

            return;
        }
        console.log("===========================");
        console.log("temperature changes: %d°", data.C);
        console.log("celsius: %d", data.C);
        console.log("fahrenheit: %d", data.F);
        console.log("kelvin: %d", data.K);
        console.log(new Date());
        console.log("===========================");
        console.log("");

        sendTemperatureToServer(data.C, data.F, data.K);
    });

    relay1 = new fiveLibrary.Relay({
        pin: relayPin1,
        type: "NC"
    });
    /* init the relay1*/
    relay1.on();
    relay1.off();


    /* we can handle this relay with console*/
    this.repl.inject({
        relay: relay1
    });

});

/** server request */
function sendTemperatureToServer(celsius, fahrenheit, kelvin) {

    var privateKeySparkFunField = "private_key=8bWeM24mmBFElpvylEx9"
    var requestUrlString = 'http://data.sparkfun.com/input/OGjz5w1KKRhlmDRAmlXd?' + privateKeySparkFunField + '&celsius=' + celsius + '&fahrenheit=' + fahrenheit + '&kelvin=' + kelvin + '&timestamp=' + new Date();
    console.log(requestUrlString);
    request(requestUrlString, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the Google homepage.
        } else {
            console.log(error);
        }
    })
}


function getDataFromServer(){
    // TODO
}