bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Cow)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    if (receivedString == "Z") {
        basic.showIcon(IconNames.Cow)
    } else if (receivedString == "b") {
        pins.analogWritePin(AnalogPin.P16, 1023)
        pins.analogWritePin(AnalogPin.P0, 0)
        pins.analogWritePin(AnalogPin.P12, 1023)
        pins.analogWritePin(AnalogPin.P8, 0)
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # . # .
            . . # . .
            `)
    } else if (receivedString == "f") {
        pins.analogWritePin(AnalogPin.P16, 0)
        pins.analogWritePin(AnalogPin.P0, 1023)
        pins.analogWritePin(AnalogPin.P12, 0)
        pins.analogWritePin(AnalogPin.P8, 1023)
        basic.showLeds(`
            . . # . .
            . # . # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (receivedString == "l") {
        pins.analogWritePin(AnalogPin.P16, 0)
        pins.analogWritePin(AnalogPin.P0, 1023)
        pins.analogWritePin(AnalogPin.P12, 0)
        pins.analogWritePin(AnalogPin.P8, 0)
        basic.showLeds(`
            . . # . .
            . # . . .
            # . # # #
            . # . . .
            . . # . .
            `)
    } else if (receivedString == "r") {
        pins.analogWritePin(AnalogPin.P16, 0)
        pins.analogWritePin(AnalogPin.P0, 0)
        pins.analogWritePin(AnalogPin.P12, 0)
        pins.analogWritePin(AnalogPin.P8, 1023)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # . #
            . . . # .
            . . # . .
            `)
    } else if (receivedString == "C") {
        basic.showIcon(IconNames.House)
        pins.analogWritePin(AnalogPin.P16, 0)
        pins.analogWritePin(AnalogPin.P0, 1023)
        pins.analogWritePin(AnalogPin.P12, 0)
        pins.analogWritePin(AnalogPin.P8, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P16, 0)
        pins.analogWritePin(AnalogPin.P0, 0)
        pins.analogWritePin(AnalogPin.P12, 0)
        pins.analogWritePin(AnalogPin.P8, 0)
        basic.showIcon(IconNames.Cow)
    }
})
let Distancia = 0
let receivedString = ""
bluetooth.startUartService()
basic.showIcon(IconNames.Yes)
control.waitMicros(6000)
basic.showIcon(IconNames.No)
basic.forever(function () {
    Distancia = sonar.ping(
    DigitalPin.P2,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
    if (receivedString == "C") {
        if (Distancia < 2) {
            pins.analogWritePin(AnalogPin.P16, 0)
            pins.analogWritePin(AnalogPin.P0, 1023)
            pins.analogWritePin(AnalogPin.P12, 0)
            pins.analogWritePin(AnalogPin.P8, 0)
            basic.showNumber(Distancia)
        }
        if (Distancia > 3) {
            pins.analogWritePin(AnalogPin.P16, 0)
            pins.analogWritePin(AnalogPin.P0, 1023)
            pins.analogWritePin(AnalogPin.P12, 0)
            pins.analogWritePin(AnalogPin.P8, 1023)
            basic.showNumber(Distancia)
        }
    }
})
