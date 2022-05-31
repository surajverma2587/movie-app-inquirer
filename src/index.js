// import inquirer and fs
const fs = require("fs");
const inquirer = require("inquirer");

// declare the questions
const questions = [
  {
    type: "input",
    message: "Please enter the name of the movie:",
    name: "title",
    // validate: (input) => {
    //   if (input.title) {
    //     return true;
    //   }

    //   return "Please enter a valid movie name";
    // },
  },
  {
    type: "list",
    message: "Please select the genre:",
    name: "genre",
    choices: [
      "Action",
      "Horror",
      "Comedy",
      "Family",
      "Adventure",
      "Sci-fi",
      "Thriller",
      "Drama",
      "Documentary",
      "Rom-Com",
      "Animated",
      "Fantasy",
    ],
  },
  {
    type: "confirm",
    message: "Is it a PG rated movie?",
    name: "isPG",
    default: false,
  },
  {
    type: "confirm",
    message: "Would you like to add another movie?",
    name: "proceed",
    default: true,
  },
];

const generateMovieCards = (movies) => {
  const createMovie = (movie) => {
    const movieCard = `<div class="card m-2" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">
          ${movie.isPG ? `<i class="fa-solid fa-child me-2"></i>` : ""}${
      movie.title
    }
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">${movie.genre}</h6>
      </div>
    </div>`;

    return movieCard;
  };

  return movies.map(createMovie).join("");
};

const init = async () => {
  let inProgress = true;
  const movies = [];

  while (inProgress) {
    // prompt the questions and get answers
    const { title, genre, isPG, proceed } = await inquirer.prompt(questions);

    movies.push({
      title,
      genre,
      isPG,
    });

    if (!proceed) {
      inProgress = false;
    }
  }

  console.log(movies);
  // generate movies.html

  const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Movie App</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossorigin="anonymous"
        />
        <style>
          .jumbotron {
            padding: 2rem 1rem;
            margin-bottom: 2rem;
            background-color: #e9ecef;
            border-radius: 0.3rem;
          }
        </style>
      </head>
      <body>
        <div class="jumbotron text-center">
          <h1 class="display-4">Movie App</h1>
          <p class="lead">
            CLI app that uses inquirer to generate a HTML page dynamically
          </p>
        </div>
        <div class="container d-flex flex-row justify-content-center flex-wrap">
          ${generateMovieCards(movies)}
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>
  `;

  // write html to file
  fs.writeFileSync("movies.html", html);
};

init();
