#!mruby

OUTPUT = 1
LOW = 0
HIGH = 1

led LOW
pinMode(7, OUTPUT)

def puts(string="")
  Serial.new(0).println string
end

class Dice
  def initialize(min=1, max=7)
    @min, @max = min, max
  end

  def turn
    1.upto(4) { |n| digitalWrite(n, LOW) }
    number = random(@min, @max)
    digitalWrite(1, HIGH) if [2, 3, 4, 5, 6].include? number
    digitalWrite(2, HIGH) if [4, 5, 6].include? number
    digitalWrite(3, HIGH) if [6].include? number
    digitalWrite(4, HIGH) if [1, 3, 5].include? number
    number
  end
end

puts "start Turn"
dice = Dice.new
running = true

loop do
  sw = digitalRead(9)
  if sw == HIGH && running
    running = false
    puts
    puts "Switch=#{sw}"
    digitalWrite(7, HIGH)
    8.times {
      puts "Number=#{dice.turn}"
      delay 400
    }
    digitalWrite(7, LOW)
    running = true
  end
end
