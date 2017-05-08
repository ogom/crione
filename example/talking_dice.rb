#!mruby

def puts(string="")
  Serial.new(0).println string
end

class Dice
  def initialize(min=1, max=7)
    @min, @max = min, max
  end

  def turn
    [17,16,9,1].each { |n| digitalWrite(n, LOW) }
    number = random(@min, @max)
    digitalWrite(17, HIGH) if [2, 3, 4, 5, 6].include? number
    digitalWrite(16, HIGH) if [4, 5, 6].include? number
    digitalWrite(9, HIGH) if [6].include? number
    digitalWrite(1, HIGH) if [1, 3, 5].include? number
    number
  end
end

led LOW
System.useMP3(15, 4)
puts
puts "Start of Turn"
dice = Dice.new
running = true

loop do
  sw = digitalRead(3)
  if sw == HIGH && running
    running = false
    number = 0
    puts
    puts "Turning..."

    8.times { |n|
      number = dice.turn
      delay 100 * (n + 1)
    }

    puts "Number=#{number}"
    MP3.play "voice/#{number}.mp3"
    running = true
  end
end
