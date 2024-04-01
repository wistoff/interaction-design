# Research Exercise: Interactive Insights

<details>
  <summary>Deutsch</summary>
  Was ist Interaktion? Beobachtet euch selbst und wie ihr im Alltag mit Technologie interagiert. Was ist eine spezifische Interaktion mit einem technologischen System/Objekt (nicht unbedingt digital), die euch besonders auffällt? Das kann eure Lieblingsinteraktion sein (gibt es so etwas?), ein wiederkehrender UI Bug oder euer meistgenutzter usability hack. Dokumentiert diese Interaktion, indem ihr sie auf Video aufnehmt (Handyvideo oder Screencast). Beantwortet dann die folgenden Fragen: 
  
  - Wie oft macht ihr diese Interaktion?
  - Wie lange dauert die Interaktion?
  - Wie zuverlässig funktioniert das Zusammenspiel?
  - In wie viele Teilschritte kann die Interaktion unterteilt werden?
  - Wie schwierig ist die Interaktion?
  - Wie zufrieden seid ihr mit der Interaktion?
  - Wie viele Akteure sind an der Interaktion beteiligt?
  
  - Was macht diese Interaktion für euch so offensichtlich?
  - Welche Definition des Begriffs "Interaktionsdesign" ergibt sich aus der Interaktion?

  Um diese Fragen zu formalisieren, werdet ihr individuell eine `.json` Datei für eure aufgenommene Interaktion vorbereiten. Bitte verwendet einen Filehoster eurer Wahl (z.B. imgur), um euer Video hochzuladen und stellt sicher, dass die URL mit `.mp4` endet. Das Array `metrics` listet die Antworten mit der jeweiligen `description` und `unit` auf -- gerne könnt ihr zwei weitere Metriken hinzufügen. Auf der Grundlage der erfassten Interaktionen erstellen wir eine Archiv website, die einen vergleichenden Überblick über eure interactive insights zeigt.
</details>

<details>
  <summary>English</summary>
  What is interaction? Observe yourself and how you interact with technology in your everday life. What is a specific interaction with a technological system/object (not necessarily digital), which is especially apparent to you? This can be your favorite interaction (is there something like that?), a reoccuring UI bug or your most used usability hack. Document this interaction by recording it on video (phone video or screencast). Then answer the following questions:

  - How often do you do this interaction?
  - How long does the interaction last?
  - How reliably does the interaction work?
  - How many sub-steps can the interaction be divided into?
  - How difficulty is the interaction?
  - How satisfied are you with the interaction?
  - How many subjects are involved in the interaction?

  - What makes this interaction so apparent to you?
  - What definition of the term "interaction design" results from the interaction?

  To formalize these questions, everyone will prepare a `.json` file for their captured interaction. Please use a file hoster of your choice (e.g. imgur) to upload your video and make sure the url ends with `.mp4`. The `metrics` array lists the answers with their respective `description` and `unit` -- feel free to add two additional metrics. Based on the captured interactions we will create an archive website that shows an comparative overview your interactive insights.
</details>


```json
{
  "from": "cnrd",
  "title": "Tik Tok Share",
  "visual": "https://i.imgur.com/MUclyJd.mp4",
  "metrics": [
    {
      "description": "frequency",
      "unit": "times per week",
      "value": "50"
    },
    {
      "description": "duration",
      "unit": "time in min",
      "value": "0:07"
    },
    {
      "description": "actors",
      "unit": "number",
      "value": "3"
    },
    {
      "description": "steps",
      "unit": "number",
      "value": "3"
    },
    {
      "description": "difficulty",
      "unit": "percent",
      "value": "70"
    },
    {
      "description": "reliability",
      "unit": "percent",
      "value": "90"
    },
    {
      "description": "satisfaction",
      "unit": "percent",
      "value": "100"
    },
    {
      "description": "explanation",
      "unit": "text",
      "value": "..."
    },
    {
      "description": "definition",
      "unit": "text",
      "value": "..."
    }
  ]
}
```
