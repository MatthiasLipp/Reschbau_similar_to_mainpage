# Tracking: Arbeitsstand 16.11.2026

Dieser Branch ist noch nicht produktiv abgenommen.

## Implementiert
- Browser-Lead erst nach HTTP-2xx des GHL-Webhooks, mit eventID = Ref-Key.
- Fehler werden angezeigt; WhatsApp bleibt als manueller Ausweichweg verfügbar.
- Doppelklicks lösen keinen zweiten POST aus.
- Kampagnenparameter, Consent-Status und Ref-Key im Payload.
- fbclid und vorhandene _fbp/_fbc nur bei aktuell akzeptiertem Meta-Tracking.
- Keine API-Schlüssel und keine automatische serverseitige Meta-Übermittlung.

HTTP-2xx bestätigt die Webhook-Annahme, nicht den gespeicherten CRM-Kontakt.
Neue Payload-Felder müssen im GHL-Eingangsworkflow gespeichert werden. Vor
Merge mit eigener Testnummer beide Vorhaben und tatsächliche CRM-Speicherung
prüfen. `node test-tracking.cjs` prüft die Browserfunktionen ohne Netzwerk.

## Rückmeldung der Leadqualität: noch nicht aktiv
Eine Formularanfrage ist noch kein qualifiziertes Vorhaben. Qualifiziert wird
nach menschlicher Prüfung von Projektort, vorhandenem Grundstück/Objekt,
Planungsstand, Bedarf und Zeitraum. Planung österreichweit; Bauausführung im
vereinbarten regionalen Gebiet. Keine Antwort allein ist kein Negativurteil.

Vorgesehene getrennte Ereignisse: qualifiziertes Vorhaben, bestätigter Termin,
gewonnener Auftrag. Eventnamen und Optimierungsfähigkeit im verwendeten
Meta-Datensatz vor Aktivierung prüfen. Nicht jede Phase erneut als Lead senden.

Erforderlich vor Aktivierung:
- dokumentierte passende Tracking-Einwilligung einschließlich CRM-Rückmeldung;
- dauerhaft gespeicherte Anfrage-Attribution und Bezug zum Ref-Key;
- geeigneter CAPI-Zugriff ausschließlich serverseitig;
- deterministische Event-ID je Anfrage und Phase, Wiederholschutz;
- Testereignis und tatsächliche Meta-Annahme prüfen;
- künstliche CRM-E-Mail-Adressen NICHT als Matching-E-Mail senden;
- keine Gesprächsinhalte, Pläne, Preisorientierungen oder Testkontakte senden;
- keine pauschale nachträgliche Übermittlung des bestehenden Kontaktbestands.

GHL bietet eine native Meta Conversion-API-Aktion mit Funnel Event und
FBCLID-Zuordnung. Die geprüfte Ereignisauswahl enthält Lead und Schedule,
aber keinen QualifiedLead-Eintrag. Die automatische Übernahme künstlicher
Kontakt-E-Mail-Adressen ist vor Verwendung dieser Aktion zu klären.
