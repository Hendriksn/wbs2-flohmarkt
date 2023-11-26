# Flohmarkt Webapp

Eine Web-Applikation für einen online Flohmarkt.

## 

- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- Angular
- HTTP
- Nest.js
- TypeORM
- SQLite

## Installation

1. Clone the repository.
2. Install dependencies by:
   1. navigate into [wbs2_online-flohmarkt/frontend]().
   2. run `npm install`.
   3. navigate into [wbs2_online-flohmarkt/backend]().
   4. run `npm install`.
3. A SQLite database will automatically be created at: [wbs2_online-flohmarkt/database/]()


## Run Application

1. Navigate to [wbs2_online-flohmarkt/frontend]().
   1. Start the frontend with `npm run watch`.
2. Navigate to [wbs2_online-flohmarkt/backend]().
   1. Start the server with `npm run start`.

## Usage

* Homepage: http://localhost:3000/home
* Navigate to `Login` or `Registrieren` in the top right corner (navbar)
* Diffent profiles and functionality for buyers and seller
* Buyers can:
  * add new articles and edit their offerings
  * negotiate with interested buyers via Chat
* Sellers can:
  * view the offered articles (for e.g. search funktion on homescreen)
  * add articles to their favorites - via http://localhost:3000/productdetail/:id
  * contact buyers via chat to close a deal, http://localhost:3000/productdetail/:id
* and many more



## Conclusion

Während der Umsetzung des Projektes sind wir auf folgende Probleme gestoßen:
- Wie ist die Architektur des Backends?
- Die gesamte Umsetzung des Chats
- Welche Entitäten müssen erstellt werden und wie funktioniert TypeORM?
  Bis zu dem Punkt, wo wir uns noch Uneinig über TypeORM und der Backend Architektur waren, konnten die zentralen Funktionalitäten wie das Logins , des Chats oder des Profils nicht erstellt werden.
  Das initiieren eines Session Management zwischen NestJS und Angular erwies sich als äußerst komplex, vorallem deswegen, weil der Browser, wie in der Mail beschrieben die Cookies nicht speichern wollte.
  Zuletzt wurde viel Aufwand dafür betrieben, das Mergen der Programmierstände sauber durchzuführen, vorallem, weil die SQL Lite Datei jedesmal Inkosistent war.

