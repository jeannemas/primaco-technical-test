# Primaco Technical Test

## Author

> [Jeanne Mas](https://jeannemas.me/) as a technical test for [Primaco](https://primaco.ca/)

## How to run the project

1. Clone the repository
2. Run `pnpm install` to install the dependencies
3. Run `pnpm serve` to start the server. You might need to adjust the port if the default port is already in use. To do this, update the [`PORT` variable inside the `src/constants.js`](src/constants.js) file
4. Access the frontend at [`http://localhost:<PORT>/index.html`](http://localhost:3000/index.html).

## Description of the project

The project is a simple frontend application that displays a list of facts thanks to [Cat facts](https://alexwohlbruck.github.io/cat-facts/).
The data is fetched from an in-memory SQLite database that is populated with the default facts from [Cat facts](https://alexwohlbruck.github.io/cat-facts/) on server start.
The table has a refresh button to refresh the data inside the table in-case it is not up to date.
The table also has a "Add fact" button that allows the user to add a new fact to the table. The fact is then added to the database and displayed in the table.
