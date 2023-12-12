// favorites.js
const imgUrl = "https://image.tmdb.org/t/p/w500/";

window.addEventListener("load", displayFavorites);

function displayFavorites() {
  const favoritesContainer = document.getElementById("favoritesContainer");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.forEach((movie) => {
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

    favoritesContainer.appendChild(cardComponent);
  });
}
