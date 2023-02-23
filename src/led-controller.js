const EventEmitter = require("node:events");
var five = require("johnny-five");


class LedUpdateEmitter extends EventEmitter {};
const onLedUpdate = new LedUpdateEmitter();
class BoardReadyEmitter extends EventEmitter {};
const onBoardReady = new BoardReadyEmitter;


/**
 * ENSURE THAT LED_RGB_PINS AND BOARD_PORT ARE SET CORRECTLY HERE
 */
const LED_RGB_PINS = [9, 10, 11];
const BOARD_PORT = 'COM5';


var board = new five.Board({port: BOARD_PORT});
let LED_RGB;

board.on("ready", function() {

    LED_RGB = new five.Led.RGB(LED_RGB_PINS);

    onLedUpdate.on('set-color', (color)=> {
        LED_RGB.color(color);
    })

    this.repl.inject({

        led_color: function(color){
            LED_RGB.color(color);
        },

        led_on: function(){
            LED_RGB.on();
        },

        led_off: function(){
            LED_RGB.off();
        }
    });
    
    LED_RGB.intensity(10).off();
    onBoardReady.emit('ready', true);

});

module.exports = {
    SetColour: (colour) => {onLedUpdate.emit('set-color', colour)},
    onBoardReady
};
