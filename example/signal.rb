#!mruby

serial = Serial.new(0)
serial.println "start Signal"

GREEN1  = 1
YELLOW1 = 2
RED1    = 3
GREEN2  = 4
YELLOW2 = 5
RED2    = 6

def light(x, y, time=600)
  serial = Serial.new(0)
  serial.println "light: x=#{x}, y=#{y}"
  1.upto(6) { |n| digitalWrite(n, 0) }
  digitalWrite(x, 1)
  digitalWrite(y, 1)
  delay time
end

1.upto(6) { |n| pinMode(n, 1) }

4.times { |n|
  serial.println "times:#{n+1}"
  light(RED1,    RED2)
  light(GREEN1,  RED2)
  light(YELLOW1, RED2, 300)
  light(RED1,    RED2)
  light(RED1,    GREEN2)
  light(RED1,    YELLOW2, 300)
}

1.upto(6) { |i| digitalWrite(i, 0) }
