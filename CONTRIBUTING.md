# Contributing in SkillSwap

In dit document zijn de regels over de samen werking binnen het project vastgelegd. Denk hierbij aan hoe we te werk gaan via waar de communicatie, code conventies, branch sturctuur etc.

## Teamleden

De onderstaande personen zijn onderdeel van het project SkillSwap.

| Naam | Rol |
|------|------|
| Remy Nijsten | Stagebegeleider (opdrachtgever SkillSwap) |
| Amber Schalker | Stagiair Frontend Development (ontwikkelaar SkillSwap) |

## Samenwerken

### Dagelijkse standup
Elke ochtend wordt een stand‑up gehouden waarin besproken wordt:
- Wat heb ik gisteren gedaan?
- Waar ga ik vandaag aan werken?
- Waar loop ik op vast?

### Communicatie platformen
- Slack → Updates en vragen over het project  
- GitHub → Issues, code reviews, taggen van personen (`@naam`)  
- Monday → Voortgang van taken; in elke Monday taak wordt de bijbehorende GitHub issue gelinkt  

### Werken aan features
- Elke feature ontvangt eerst feedback en wordt pas na verwerking gemerged in `main`.
- Fouten in `main` moeten direct opgelost worden om stabiliteit te behouden.

<img width="500" alt="image" src="https://github.com/user-attachments/assets/a5c455bd-bdf9-49fe-8420-84eb712a8751" />

## Workflow

- De `main` branch bevat altijd de meest recente en stabiele versie.
- Er wordt direct op `main` gewerkt, dus zorgvuldigheid is extra belangrijk.
- Elke feature wordt gereviewd door de stagebegeleider en getest op:
  - Performance (Lighthouse)
  - Toegankelijkheid (Lighthouse + handmatige tab‑test)
  - Responsiveness (mobile, tablet, desktop, brede schermen)

### Monday Projectboard
- Taken doorlopen de statussen: To do → Doing → Check → Done (Backlog indien nodig)
- Elke taak heeft een deadline
- Minimaal één persoon is verantwoordelijk voor de taak
 
<img width="189" height="262" alt="image" src="https://github.com/user-attachments/assets/62325d4a-0e75-4228-b3af-87458be18a65" />

## Definition of Done

Een taak is pas "done" wanneer:

- De feature werkt zoals verwacht
- De code gereviewd is
- De code getest is
- De feature in de `main` branch staat

## Commit conventies
Gebruik duidelijke en consistente commit messages.

### Structuur

`type: korte beschrijving`

### Soorten commits

- `feat` → nieuwe feature
- `fix` → bugfix
- `style` → styling (geen functionele verandering)
- `refactor` → code verbeteren
- `docs` → documentatie

### Bijvoorbeeld

`feat: header component toegevoegd`

## Code conventies
### HTML
- Gebruik semantische elementen (`<main>`, `<section>`, etc.)
- Vermijd onnodige `<div>`s
- Denk aan toegankelijkheid (aria alleen indien nodig)

### CSS
- Gebruik consistente naamgeving (bijv. utility classes)
- Maak gebruik van Tailwind CSS en waar nodig overige CSS in de global.css bestand.
- Vermijd inline styles

### JavaScript
- Gebruik duidelijke variabelenamen
- Vermijd globale variabelen
- Schrijf kleine, herbruikbare functies
