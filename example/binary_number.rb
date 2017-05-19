#!mruby

class Subject
  def initialize
    @state = nil
    @observers = []
  end

  def add_observer(observer)
    @observers << observer
  end

  def notify_observers
    @observers.each do |observer|
      observer.update(self)
    end
  end
  
  def state
    @state
  end
end

class Counter < Subject
  def initialize
    super()
    @state = 0
  end
  
  def action(type)
    case type
    when 'increase'
      @state += 1 if @state < 255
    when 'decrease'
      @state -= 1 if @state > 0
    end

    notify_observers
  end
end

class CounterPrint
  def initialize
    @usb = Serial.new(0)
  end
  
  def update(subject)
    @usb.println subject.state.to_s
  end
end

class BinaryWrite
  def initialize
    10.upto(17) {|n| pinMode(n, HIGH)}
  end
  
  def update(subject)
    10.upto(17) {|n| digitalWrite(n, LOW)}
    subject.state.to_s(2).reverse.split('').each_with_index do |n, i|
      digitalWrite(i+10, n.to_i)
    end
  end
end

usb = Serial.new(0)
usb.println "Start of Counter"

counter = Counter.new
counter.add_observer(CounterPrint.new)
counter.add_observer(BinaryWrite.new)
 
pinMode(2, INPUT)
pinMode(8, INPUT)

loop do
  if digitalRead(2) == LOW
    counter.action('increase')
    delay 300
  end
  
  if digitalRead(8) == LOW
    counter.action('decrease')
    delay 300
  end
end
