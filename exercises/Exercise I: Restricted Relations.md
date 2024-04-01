# Exercise I: Restricted Relations

Connect a button, a microcontroller and an LED, connect a cable to a touch-GPIO of the microcontroller (you may also connect the cable to some aluminum foil). Perform a number of experiments in which the LED is affected by the button/touch sensor:

Set a goal/narrative for your interaction: is this a minimal game (reaction, timing, pattern repetition, touch the truck), a light switch, a purely aesthetic object, a creature you interact with?

Vary (some of) the following parameters:
- the relation between action and light (on/off while pressed, switched by action, fade by action, brightness depending on touch, partially random behavior, fully random behavior ...)
- the timing of action and reaction (synchronous, delayed, mixed — e.g. switch on and timed fade)
- what other parameters are there?

Try these interactions together and observe how the interaction feels differently depending on these choices. Document the results and decide which one is the best overall fit for your goal. The focus should be on the process and not the goal.

<details>
  <summary>German Translation</summary>
Schließt einen Taster und eine LED an den ESP an, verbindet ein Kabel mit einem Touch-GPIO des Mikrocontrollers. Führet eine Reihe von Experimenten durch, bei denen die LED durch den Knopf/Touch-GPIO beeinflusst wird:

Legt ein Ziel/Narrativ für die Interaktion fest: handelt es sich um ein minimalistisches Spiel (Action-Reaction, Timing, Wiederholung von Mustern, Touch the truck), einen Lichtschalter, ein rein ästhetisches Objekt, eine interaktive Kreatur?

Variiert dabei (einige) der folgenden Parameter:
- die Beziehung zwischen Aktion und Licht (an/aus, wenn gedrückt, gewechselt durch Knopfdruck, verblassen durch Knopfdruck, Helligkeit abhängig von der Berührung, teilweise zufälliges Verhalten, vollständig zufälliges Verhalten ...)
- das Timing von Aktion und Reaktion (synchron, verzögert, gemischt – z.B. Einschalten und zeitgesteuertes Ausblenden)
- welche anderen Parameter gibt es noch?

Probiert diese Interaktionen zusammen aus und beobachtet, wie sich die jeweilige Interaktion je nach den gewählten Parametern unterschiedlich anfühlt. Dokumentiert die Ergebnisse und entscheidet, welche Variante am besten zu dem gewählten Ziel/Narrativ passt. Der Schwerpunkt sollte auf dem Prozess und nicht auf dem Ziel liegen.
</details>

### Light on while button pressed
```c
const int ledPin = 5;
const int buttonPin = 4; // built-in is 0

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  int in = digitalRead(buttonPin);
  digitalWrite(ledPin, in);
}
```

### Light on while touch (via threshold)
```c
const int ledPin = 5;
const int touchPin = 2;
const int threshold = 50;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  int in = touchRead(touchPin);
  Serial.println(in);
  if (in > threshold) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
  delay(50);
}
```

### Button as switch
```c
const int ledPin = 5;
const int buttonPin = 4; // 0 for built-in button

int lastState = 1;
long lastTime;
int onOff = 0;

void setup() {
  Serial.begin(115200);
  pinMode (ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);
  digitalWrite(ledPin, onOff);
  lastTime = millis();
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  if (buttonState != lastState && millis() - lastTime > 100) {
  Serial.print(buttonState);
  Serial.print(" - ");
  Serial.println(lastState);
  if (buttonState==HIGH) { // Only react to button release!
    onOff = !onOff;
    digitalWrite(ledPin, onOff);
  }
  lastState = buttonState;
  lastTime = millis();
}
}
```

### Button switches fading LED
```c
const int ledPin = 5;
const int buttonPin = 4;  // 0 for built-in button

#define LEDC_CHANNEL_0 0
#define LEDC_TIMER_13_BIT 13
#define LEDC_BASE_FREQ 5000

int brightness = 0;
int dir = 0;

int lastState = 0;
long lastTime;

// https://github.com/espressif/arduino-esp32/blob/master/libraries/ESP32/examples/AnalogOut/LEDCSoftwareFade/LEDCSoftwareFade.ino
// Arduino like analogWrite
// value has to be between 0 and valueMax
void ledcAnalogWrite(uint8_t channel, uint32_t value, uint32_t valueMax = 255) {
  // calculate duty, 8191 from 2 ^ 13 - 1
  uint32_t duty = (8191 / valueMax) * min(value, valueMax);
  // write duty to LEDC
  ledcWrite(channel, duty);
}

void setup() {
  Serial.begin(115200);
  ledcSetup(LEDC_CHANNEL_0, LEDC_BASE_FREQ, LEDC_TIMER_13_BIT);
  ledcAttachPin(ledPin, LEDC_CHANNEL_0);
  pinMode(buttonPin, INPUT_PULLUP);
  lastTime = millis();
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  if (buttonState != lastState && millis() - lastTime > 100) {
    if (buttonState == HIGH) {  // Only react to button release!
      Serial.println("ha");
      if (brightness == 255 || dir == 1)
        dir = -1;
      else
        dir = 1;
    }
    lastState = buttonState;
    lastTime = millis();
  }
  brightness += dir;
  if (brightness == 255 || brightness == 0) {
    dir = 0;
  }
  Serial.println(brightness);
  ledcAnalogWrite(LEDC_CHANNEL_0, brightness);
  delay(5);
}
```

### Touching as brightness
```c
#define LEDC_CHANNEL_0 0
#define LEDC_TIMER_13_BIT 13
#define LEDC_BASE_FREQ 5000

const int buttonPin = 4;
const int ledPin = 5;
int brightness = 0;
int dir = 0;

// https://github.com/espressif/arduino-esp32/blob/master/libraries/ESP32/examples/AnalogOut/LEDCSoftwareFade/LEDCSoftwareFade.ino
// Arduino like analogWrite
// value has to be between 0 and valueMax
void ledcAnalogWrite(uint8_t channel, uint32_t value, uint32_t valueMax = 255) {
  // calculate duty, 8191 from 2 ^ 13 - 1
  uint32_t duty = (8191 / valueMax) * min(value, valueMax);
  // write duty to LEDC
  ledcWrite(channel, duty);
}

void setup() {
  ledcSetup(LEDC_CHANNEL_0, LEDC_BASE_FREQ, LEDC_TIMER_13_BIT);
  ledcAttachPin(ledPin, LEDC_CHANNEL_0);
  pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
  int in = touchRead(2);
  brightness = constrain(map(in, 10, 70, 255, 0), 0, 255);
  ledcAnalogWrite(LEDC_CHANNEL_0, brightness);
  delay(25);
}
```
