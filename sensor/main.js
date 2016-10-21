/**
 * Main script
 */

// import libraries
var raspiIoLibrary = require('raspi-io');
var fiveLibrary = require('johnny-five');

/* all scope var: temp and bar sensors (unique)*/
var temp, bar; // undefined for now

/* setup board*/
var board = new fiveLibrary.Board({
    io: new raspiIoLibrary()
});

board.on('ready', function () {

    /**read temperature data every 5 sec. */
    temp = new fiveLibrary.Thermometer({
        controller: "BMP180",
        freq: 5000
    });

    temp.on("change", function (data, err) {
        if (err) {

            return;
        }
        console.log("===========================")
        console.log("temperature changes: %d°", data.C);
        console.log("celsius: %d", data.C);
        console.log("fahrenheit: %d", data.F);
        console.log("kelvin: %d", data.K);
        console.log("===========================")
        console.log("")

    });


});