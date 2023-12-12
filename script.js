const apikey = "aaba991f751949d19308147f9d409302";
const url = "https://api.themoviedb.org/3/";
const video = "&append_to_response=videos";
const imgUrl = "https://image.tmdb.org/t/p/w500/";

const page1 = document.getElementById("page_1");
const page2 = document.getElementById("page_2");
const page3 = document.getElementById("page_3");
const page4 = document.getElementById("page_4");
const page5 = document.getElementById("page_5");
const nextPage = document.getElementById("nextPage");
const prevPage = document.getElementById("prevPage");
// console.log(page);

window.addEventListener("load", () => fetchData());

async function fetchData(device = "movie", type = "popular", page = 1) {
  const response = await fetch(
    `${url}${device}/${type}?api_key=${apikey}&page=${page}}`
  );
  // console.log(response);
  const data = await response.json();
  // console.log(data.results);
  showCard(data.results);
  // console.log(data);

  // console.log(device,type,page);

  // console.log(page= page+1);
  page1.addEventListener("click", () => {
    page = 1;
    fetchData(device, type, page);
    // console.log(page);
  });
  page2.addEventListener("click", () => {
    page = 2;
    fetchData(device, type, page);
    // console.log(page);
  });
  page3.addEventListener("click", () => {
    page = 3;
    fetchData(device, type, page);
    // console.log(page);
  });
  page4.addEventListener("click", () => {
    page = 4;
    fetchData(device, type, page);
    prevPage.classList.remove("text-white-700", "bg-blue-400");
    // console.log(page);
  });
  page5.addEventListener("click", () => {
    page = 5;
    fetchData(device, type, page);
    // console.log(page);
  });
  nextPage.addEventListener("click", () => {
    page = page + 1;
    fetchData(device, type, page);
    console.log(page);
  });
  prevPage.addEventListener("click", () => {
    if (page === 1) {
      return; // Prevent fetching data if page is already 1
    }
    page = page - 1;

    fetchData(device, type, page);
    // console.log(page);
  });
}

function showCard(movieData) {
  const cardContainer = document.querySelector("#cardContainer");
  cardContainer.innerHTML = "";
  // console.log(movieData);
  movieData.map((movie) => {
    const cardComponent = document.createElement("div");
    cardComponent.classList.add(
      "relative",
      "p-2",
      "my-5",
      "sm:basis-full",
      "md:basis-1/2",
      "lg:basis-1/4",
      "xl:basis-1/4",
      "2xl:basis:1/6",
      "justify-center"
    );
    cardComponent.innerHTML = `<div class="relative  w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
        <div
          class="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 max-h-96">
          <img
            src=${imgUrl + movie.poster_path}
            alt="ui/ux review check" />
          <div
            class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60">
          </div>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between mb-3">
            <h5 class="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
              ${movie.original_title || movie.name}
            </h5>
            <p
              class="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="-mt-0.5 h-5 w-5 text-yellow-700">
                <path fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clip-rule="evenodd"></path>
              </svg>
              ${movie.popularity}
            </p>
          </div>
          <p class="font-sans text-base antialiased font-light leading-relaxed text-gray-700 line-clamp-3">
            ${movie.overview}
          </p>
        </div>
      </div>`;

    const heartButton = document.createElement("button");
    heartButton.classList.add("heart-button", "absolute", "top-10", "left-10");
    heartButton.innerHTML = '<span class="heart-icon text-white-900">🤍</span>';
    heartButton.addEventListener("click", (e) => addToFavorites(movie, e));

    cardComponent.appendChild(heartButton);
    if (
      movie.overview == "" ||
      movie.poster_path == "" ||
      movie.original_title == "" ||
      movie.name == ""
    ) {
      return;
    } else {
      cardContainer.appendChild(cardComponent);
    }
  });
}

function loadData(device, type, page = 1) {
  console.log(device, type, page);
  // console.log(page);
  fetchData(device, type, page);
}

function addToFavorites(movie, event) {
  // console.log(event);
  console.log(movie);

  const heartButton = event.target;
  // Assuming you have a favorites array to store selected movies
  // You can use localStorage or any other storage mechanism as well
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the movie is already in favorites
  const isAlreadyFavorite = favorites.some(
    (favorite) => favorite.id === movie.id
  );
  if (!isAlreadyFavorite) {
    // Add the movie to favorites
    favorites.push(movie);
    // Update the UI of the heart button (optional)
    heartButton.innerHTML = '<span class="heart-icon text-white-900">❤️</span>';
    // Update the favorites array in localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
    // Optionally, you can redirect to the favorites page or provide some visual feedback
    alert("Added to Favorites!");
  } else {
    // Optionally, you can remove the movie from favorites (comment this line if not needed)
    favorites = favorites.filter((favorite) => favorite.id !== movie.id);
    // Update the UI of the heart button (optional)
    heartButton.innerHTML = '<span class="heart-icon text-white-900">🤍</span>';
    // Update the favorites array in localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Removed from Favorites!");
  }
}
