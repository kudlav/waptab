# Personal homepage

## Installation
Project requires [npm](https://github.com/npm/cli/). Tested with Node.js 16.15.1 LTS and npm 8.11.

### Development

Install devDependencies and start building service for development.

```sh
$ npm install
$ npm run dev-build
```

### Production

Install the devDependencies and build project.

```sh
$ npm install
$ npm run build
```

## O projektu (sk)
Cieľom pojektu je vytvoriť osobnú domácu stránku za použitia ľubovolných webových technológií.
Stránka bude pozostávať z upravovateľných widgetov ktoré budú uživateľovi prezentovať relevantné informácie (RSS feed, počasie, ...).

Domáca stránka bude konfigurovateľná vhodným mechanizmom ako je napr. štrukturovaný konfiguračný jazy (XML, JSON, ...).
Konfigurácia by mala byť v rámci možností uživateľsky prívetivá.
Konfigurovatelné by malo byť minimálne rozloženie/počet/typ widgetov ako aj vlastnosti samotných widgetov (poloha pre počasie, RSS zdroj, ...).
Jeden widget nie je limitovaný na jedno použitie, t.j. stránka môže obsahovať napr. viac RSS feedov.

Aspoň widget počasia by mal byť vlastnou implementáciou; povolené sú stavebné bloky uľahčujúce rozloženie prvkov v rámci widgetu a voľne dostupné ikonové fonty alebo iné primitívne grafické prvky na prezentáciu informácií.
Logika spracovania informácií z dostupného zdroja a ich transformovanie na prvky ktoré sa zobrazia uživateľovi musí byť vlastná.
Widget by mal podporovať viac ako jeden zdroj dát (napr. OpenWeatherMap, AccuWeather, Yr.no a iné) a použitie API týchto služieb bude popísané v dokumentácii.
Pokiaľ sa dostupné API budú výrazne líšiť a bude treba vytvoriť adaptér pre každé z nich, bude návrh tejto adaptačnej vrstvy taktiež popísaný v dokumentácii.

Všeobecne by stránka mala byť navrhnutá tak, aby bola otvorená rozšíreniam, či už vo forme nových dátových zdrojov alebo kompletne nových widgetov.
Dokumentácia bude obsahovať popis tvorby ukážkového "hello world" widgetu ktorý demonštruje túto vlasnosť.

Na implementáciu je možné použiť ľubovolnú webovú technológiu a jazyk, t.j. Javascript s nejakým frameworkom (Angular, React, Ember, Vue, ...) (alebo aj bez), jazyky prekladané do Javascriptu (Typescript, Clojurescript, Elm, Purescript, ...) alebo technológie prekladané do WebAssembly.
Dokumentácia bude obsahovať odôvodnenie výberu technológie (chcem ci jazyk X vyskúšať je valídny ale nie dostatočný dôvod - skúsiť rozpísať čo Vás na danej technológii zaujalo) ako aj spätné zhodnotenie výberu technológie a práce s ňou (framework X bol dobrá voľba pretože feature Y nám výrazne zjednodušila implementáciu, technológia Z bola náročná na naučenie a pri práci na projekte sme nepocítili žiadne benefity...).
