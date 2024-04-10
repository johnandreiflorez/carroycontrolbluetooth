def on_bluetooth_connected():
    basic.show_icon(IconNames.COW)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    basic.show_icon(IconNames.NO)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def on_uart_data_received():
    global receivedString
    receivedString = bluetooth.uart_read_until(serial.delimiters(Delimiters.HASH))
    if receivedString == "Z":
        basic.show_icon(IconNames.COW)
    elif receivedString == "b":
        pins.analog_write_pin(AnalogPin.P16, 1023)
        pins.analog_write_pin(AnalogPin.P0, 0)
        pins.analog_write_pin(AnalogPin.P12, 1023)
        pins.analog_write_pin(AnalogPin.P8, 0)
        basic.show_leds("""
            . . # . .
            . . # . .
            # . # . #
            . # . # .
            . . # . .
            """)
    elif receivedString == "f":
        pins.analog_write_pin(AnalogPin.P16, 0)
        pins.analog_write_pin(AnalogPin.P0, 1023)
        pins.analog_write_pin(AnalogPin.P12, 0)
        pins.analog_write_pin(AnalogPin.P8, 1023)
        basic.show_leds("""
            . . # . .
            . # . # .
            # . # . #
            . . # . .
            . . # . .
            """)
    elif receivedString == "l":
        pins.analog_write_pin(AnalogPin.P16, 0)
        pins.analog_write_pin(AnalogPin.P0, 1023)
        pins.analog_write_pin(AnalogPin.P12, 0)
        pins.analog_write_pin(AnalogPin.P8, 0)
        basic.show_leds("""
            . . # . .
            . # . . .
            # . # # #
            . # . . .
            . . # . .
            """)
    elif receivedString == "r":
        pins.analog_write_pin(AnalogPin.P16, 0)
        pins.analog_write_pin(AnalogPin.P0, 0)
        pins.analog_write_pin(AnalogPin.P12, 0)
        pins.analog_write_pin(AnalogPin.P8, 1023)
        basic.show_leds("""
            . . # . .
            . . . # .
            # # # . #
            . . . # .
            . . # . .
            """)
    else:
        pins.analog_write_pin(AnalogPin.P16, 0)
        pins.analog_write_pin(AnalogPin.P0, 0)
        pins.analog_write_pin(AnalogPin.P12, 0)
        pins.analog_write_pin(AnalogPin.P8, 0)
        if receivedString == "A":
            basic.show_icon(IconNames.HOUSE)
            pins.analog_write_pin(AnalogPin.P16, 0)
            pins.analog_write_pin(AnalogPin.P0, 1023)
            pins.analog_write_pin(AnalogPin.P12, 0)
            pins.analog_write_pin(AnalogPin.P8, 1023)
        else:
            basic.show_icon(IconNames.COW)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.HASH), on_uart_data_received)

receivedString = ""
bluetooth.start_uart_service()
basic.show_icon(IconNames.YES)
control.wait_micros(5000)
basic.show_icon(IconNames.NO)