#!/bin/sh

pins=(0 1 6 2 3 18 19 11)

omega2-ctrl gpiomux set spi_cs1 gpio

for pin in $pins; do
  fast-gpio set-output $pin
  fast-gpio set $pin 0
done
