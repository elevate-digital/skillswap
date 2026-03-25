## SkillSwap

SkillSwap is het platform dat studenten en junior developers helpt om kennis met elkaar uit te wisselen. Je kunt jouw eigen Skill aanbieden of jouw vraag aanmaken. Hier kan kennis voor uitgewisseld worden te commenten op de skill of vraag. 

**Doel:** Het uitwisselen van kennis voor beginnende frontend end devopers.

### Team

| Naam | Functie | Rol |
| --- | --- | --- |
| Amber Schalker | Stagiair Frontend Developer | Developer applicatie |
| Remy Nijsten | Fullstack Developer (stagebeleider) | Opdrachtgever |

![hero-mockup-skillswap](https://github.com/user-attachments/assets/75d2c3d9-a592-43e0-90f2-c43e9d7e0df2)

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
### Ontwerpkeuzes
- Zacht groen en wit geven het ontwerp een frisse, rustige en toegankelijke uitstraling.
- Moderne sans‑serif typografie zorgt voor een strakke, eigentijdse look en goede leesbaarheid.
- Veel witruimte maakt het ontwerp overzichtelijk en laat belangrijke elementen beter opvallen.
- Subtiele groentinten en lichte accenten creëren visuele hiërarchie zonder drukte.
- Responsive ontwerp zorgt dat alle onderdelen mooi meeschalen op mobiel, tablet en desktop.
- Toegankelijke kleurcontrasten verbeteren de leesbaarheid voor alle gebruikers.
- Minimalistische iconen en zachte vormen versterken de vriendelijke, moderne uitstraling.

### Styleguide

<img width="866" height="457" alt="image" src="https://github.com/user-attachments/assets/ebe346d0-d155-4f64-a408-e621c7133cb8" />

### Belangrijke features
#### Splash Screen
- De splash screen verschijnt alleen bij het eerste bezoek en verdwijnt automatisch zodra de app klaar is met laden.
- Dankzij localStorage werkt de logica betrouwbaar en wordt de animatie nooit onnodig opnieuw getoond.
- De interface blijft duidelijk doordat de splash soepel fade‑out wanneer de content beschikbaar is.
- Met een Lottie animatie en subtiele overgang voelt de eerste indruk van de app vriendelijk en professioneel.

https://github.com/user-attachments/assets/658692fb-4c5c-4112-8357-a986c2eca23d

#### Filter switch

- De switch maakt het mogelijk om tussen twee weergaven te wisselen door de gekozen optie in de URL‑parameter op te slaan.
- De component blijft volledig bruikbaar zonder JavaScript dankzij `<noscript>` fallback.
- De interface gebruikt duidelijke labels en een state om te laten zien welke optie in de switch gekozen is.
- Met animaties wordt ervoor gezorgd dat het switchen aangemaan is voor de gebruiker.

https://github.com/user-attachments/assets/1b5473c8-5762-4a35-a679-04a84ac27ea0

#### Stagger animatie
- De cards verschijnen pas wanneer de data geladen is, zodat de interface nooit half leeg toont + er wordt dan ook een fallback weergegeven.
- De animatie past zich automatisch aan voor gebruikers met `prefers reduced motion`.
- Elke card fade subtiel in, waardoor de content rustig en duidelijk binnenkomt.
- De stagger animatie zorgt voor goede perceived performance voor de gebruiker.

https://github.com/user-attachments/assets/edd9de31-360f-429b-a8eb-f104d3cc12b5

## Kenmerken

### Data ophalen

- SkillSwap haalt alle data op via Axios.
- De frontend maakt gebruik van Next.js‑rewrites, waardoor alle requests via /api/... lopen en automatisch worden doorgestuurd naar de externe API op Render. Dit voorkomt CORS‑problemen en houdt de backend URL verborgen.

#### Dataflow

1. De frontend doet een request naar een lokaal endpoint zoals /api/skill.
2. Next.js stuurt dit door naar de Render‑API (/skill).
3. De API retourneert JSON‑data.
4. Axios verwerkt de response en toont deze in de UI.

Voorbeeld:

```
const res = await axios.get("/api/skill");
setSkills(res.data);

```

### Endpoints

| Frontend endpoint | Backend endpoint | Beschrijving |
| --- | --- | --- |
| ``/api/register`` | ``/user/register`` | Registreert een nieuwe gebruiker |
| ``/api/login`` | ``/user/login`` | Logt een gebruiker in |
| ``/api/tag/find-or-create`` | ``/tag/find-or-create`` | Zoekt een tag of maakt deze aan |
| ``/api/tag/:id`` | ``/tag/:id`` | Haalt één specifieke tag op |
| ``/api/tag`` | ``/tag`` | Haalt alle tags op of maakt een nieuwe tag aan |
| ``/api/skill`` | ``/skill`` | Haalt alle skills op of maakt een nieuwe skill aan |
| ``/api/skill/:id`` | ``/skill/:id`` | Haalt één specifieke skill op of verwijdert deze |

### Routes
Hieronder een overzicht van alle routes binnen het project SkillSwap:

| Route | Beschrijving |
| --- | --- |
| [``/``](https://github.com/elevate-digital/skillswap/blob/main/app/page.tsx) | Homepagina met overzicht van alle skills en vragen. |
| [``/login``](https://github.com/elevate-digital/skillswap/blob/main/app/login/page.tsx) | Pagina waar gebruikers kunnen inloggen. |
| [``/register``](https://github.com/elevate-digital/skillswap/blob/main/app/register/page.tsx) | Pagina waar nieuwe gebruikers een account kunnen aanmaken. |
| [``/skill-aanvraag``](https://github.com/elevate-digital/skillswap/blob/main/app/skill-aanvraag/page.tsx) | Pagina met formulier waarmee je een skill kan aanbieden. |
| [``/hulp-nodig``](https://github.com/elevate-digital/skillswap/blob/main/app/hulp-nodig/page.tsx) | Pagina met formulier waarmee je jouw vraag kunt stellen. |
| [``/delete-skills``](https://github.com/elevate-digital/skillswap/blob/main/app/delete-skills/page.tsx) | Pagina voor het beheren of verwijderen van eigen skills. |

### Datamodel
Onderstaand datamodel laat zien hoe de belangrijkste entiteiten binnen SkillSwap met elkaar verbonden zijn en hoe data onderling wordt gebruikt.

<img width="1105" height="602" alt="Image" src="https://github.com/user-attachments/assets/6d4f636f-0dfe-42ae-9ddf-6c1fe6c3b63b" />
 
## Installatie
Volg deze stappen om SkillSwap lokaal op je computer te installeren en te draaien:

1. Repository clonen

```
git clone https://github.com/<jouw-gebruikersnaam>/SkillSwap.git
cd SkillSwap
```

3. Dependencies installeren

```
npm install
```

3. Project starten

```
npm run dev
```

## Licentie
This project is licensed under the terms of the [MIT license](./LICENSE)
