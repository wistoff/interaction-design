## Exercise description
<details>
  <summary>Deutsch</summary>
Experimentiert mit einer „komplexen“ Input Modality (z. B. Sound, Video, Temperatur, Herzfrequenz, Public API, Machine-Learning-Model, ) und entwerft eine Interaktion, die ein ungewöhnliches Verhalten erfordert, um die LED zu beeinflussen. Achtet wieder auf den Kontext bzw. erschließt eine neue Narrative und erkundet den Parameterraum der möglichen Interaktionen (von Verzögerungen bis zu Trainingsdaten).
</details>

<details>
  <summary>English</summary>
  Experiment with a "complex" input modality (e.g. sound, video, temperature, heart rate, public API, machine learning model, ) and design an interaction that requires unusual behaviour to influence the LED. Again, pay attention to the context or develop a new narrative and explore the parameter space of possible interactions (from delays to training data).
</details>


## Examples:
- [Blendie – a voice controlled blender (2003)](https://youtu.be/6DDkwdPaYmk) by Kelly Dobson
- [Motor Karaoke (2007)](https://youtu.be/kBnBZLJYwrg) by MEC
- [Bat Vision (2020)](https://vimeo.com/424791809) by Zihlmann et al.
- [Line Wobbler (2015)](https://www.aipanic.com/projects/wobbler) by Baumgarten et al.


## Code

Organised in levels, choose what suits your skills.

### Sensor → Light (Level 🟢⚪️⚪️⚪️)
e.g. Heartbeat Sensor, Magnet Sensor, Pressure Sensor ... 

### Microphone → Volume → Light (Level 🟢🟢⚪️⚪️)
Zum Beispiel in Processing (Examples/… /[AudioInput](https://github.com/processing/processing-sound/blob/master/examples/IO/AudioInput/AudioInput.pde) plus etwas [Serial](https://processing.org/reference/libraries/serial/Serial.html)):

#### Processing
```
import processing.serial.*;
import processing.sound.*;

AudioIn input;
Amplitude loudness;

Serial myPort;

void setup() {
  size(640, 360);
  background(255);
  input = new AudioIn(this, 0);
  input.start();
  loudness = new Amplitude(this);
  loudness.input(input);
  myPort = new Serial(this, Serial.list()[0], 9600);
}

void draw() {
  float volume = loudness.analyze();
    
  if (volume > 0.1) {
    myPort.write(1);
  } else {
    myPort.write(0);
  }

  int size = int(map(volume, 0, 0.5, 1, 350));
  background(125, 255, 125);
  noStroke();
  fill(255, 0, 150);
  ellipse(width/2, height/2, size, size);
}
```

#### Arduino 
```
const int ledPin = 5;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, 0);
}

void loop() {
  if (Serial.available() > 0) {
    int inByte = Serial.read();
    Serial.write(inByte);
    digitalWrite(ledPin, inByte);
  }
}
```

### Public API → Light (Level 🟢🟢🟢⚪️)
https://github.com/public-apis/public-apis


### Microphone → Machine Learning → Light (Level 🟢🟢🟢🟢)
Machine Learning mit [p5js](https://p5js.org/) und [ml5js](https://ml5js.org/) (und [p5.serialcontrol](https://github.com/p5-serial/p5.serialcontrol)), sowie Googles [Teachable Machine](https://teachablemachine.withgoogle.com/), trainiert (re-training) und ausgeführt im Browser.
Training via [https://teachablemachine.withgoogle.com/train/audio](https://teachablemachine.withgoogle.com/train/audio)

Model exportieren und dann Ausführen via p5js/ml5js, z.B. im Web-Editor (und mit [Code von Daniel Shiffman](https://thecodingtrain.com/tracks/teachable-machine/teachable-machine/3-sound-classification) plus [p5.serialserver](https://github.com/p5-serial/p5.serialserver) and [p5.serialport](https://github.com/p5-serial/p5.serialport)):
```
// ...
let emoji = "?";
// Pick an emoji based on label
if (label == "Screaming!") {
  emoji = "?";
  serial.write(1);
} else {
  serial.write(0);
}
// ...
```

- [Ganzes Programm im Web-Editor](https://editor.p5js.org/wistoff/sketches/ys0KGH4-V)
- Arduino-Programmierung [p5.serialport](https://github.com/p5-serial/p5.serialport)
- Verbindung via [p5.serialserver](https://github.com/p5-serial/p5.serialserver)

Tutorials dazu:
- [https://thecodingtrain.com/tracks/teachable-machine](https://thecodingtrain.com/tracks/teachable-machine)
- [https://makeabilitylab.github.io/physcomp/communication/web-serial.html#does-my-web-browser-support-web-serial](https://makeabilitylab.github.io/physcomp/communication/web-serial.html#does-my-web-browser-support-web-serial)
- [https://github.com/p5-serial/p5.serialserver](https://github.com/p5-serial/p5.serialserver)