#!mruby

class Motor
  def initialize(in_pin1, in_pin2, pwm_pin)
    @in_pin1, @in_pin2, @pwm_pin = in_pin1, in_pin2, pwm_pin
    [@in_pin1, @in_pin2].each { |pin| pinMode(pin, OUTPUT)}
    pwm(@pwm_pin, 0)
  end

  def cw # clockwise
    digitalWrite(@in_pin1, HIGH)
    digitalWrite(@in_pin2, LOW)
  end

  def ccw # counterclockwise
    digitalWrite(@in_pin1, LOW)
    digitalWrite(@in_pin2, HIGH)
  end

  def brake
    digitalWrite(@in_pin1, HIGH)
    digitalWrite(@in_pin2, HIGH)
  end

  def stop
    digitalWrite(@in_pin1, LOW)
    digitalWrite(@in_pin2, LOW)
  end

  def speed=(value)
    pwm(@pwm_pin, value)
  end
end

class Gearbox
  def initialize(motor1, motor2)
    @motor1, @motor2 = motor1, motor2
  end
  
  def cw # clockwise
    @motor1.cw
    @motor2.cw
  end  

  def ccw # counterclockwise
    @motor1.ccw
    @motor2.ccw
  end
  
  def brake
    @motor1.brake
    @motor2.brake
  end

  def stop
    @motor1.stop
    @motor2.stop
  end
  
  def speed=(value)
    @motor1.speed = value
    @motor2.speed = value
  end
  
  def drive
    @motor1.cw
    @motor2.ccw
  end

  def reverse
    @motor1.ccw
    @motor2.cw
  end

  def move(time=0, speed=0)
    _accelerate(speed)
    delay time - (speed * 4)
    _decelerate(speed)
  end

  def _accelerate(speed)
    0.upto(speed) do |num|
      self.speed = num
      delay 2
    end
  end
  
  def _decelerate(speed)
    speed.downto(0) do |num|
      self.speed = num
      delay 2
    end
  end
end

class Vehicle < Gearbox
  def forward(time=2000, speed=200)
    drive
    move(time, speed)
  end

  def backward(time=2000, speed=200)
    reverse
    move(time, speed)
  end
  
  def rightward(time=1800, speed=180)
    cw
    move(time, speed)
  end
    
  def leftward(time=1800, speed=180)
    ccw
    move(time, speed)
  end
end

usb = Serial.new(0)
usb.println "Start of Vehicle"

vehicle = Vehicle.new(
  Motor.new(18, 3, 4), 
  Motor.new(15, 14, 10)
)

vehicle.stop

usb.println "...Move forward"
vehicle.forward

usb.println "...Turn right"
vehicle.rightward

usb.println "...Turn left"
vehicle.leftward

usb.println "...Move backward"
vehicle.backward

vehicle.brake
