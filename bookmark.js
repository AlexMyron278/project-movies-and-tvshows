const API_KEY = "ccde456b58f5587d49750d0077c801b3";
const API_CALL = "api_key=ccde456b58f5587d49750d0077c801b3";
const NORM_LINK = "https://api.themoviedb.org/3/";

function addNewMovie(id) {
  let bookmarkElement = document.getElementById("bookmark");
  let row = document.getElementById("movieRow");
  const new_col = document.createElement("div");
  new_col.classList.add("col-3");

  let url = NORM_LINK + "movie/" + id + "?" + API_CALL + "&language=en-US";
  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      const img = document.createElement("img");
      img.src = "https://image.tmdb.org/t/p/w500/" + data.poster_path;
      document.body.appendChild(img);
      img.id = "watchlist-" + data.id;
      img.dataset.identifier = data.id;
      img.style.padding = "5px";

      img.addEventListener("click", function () {
        clickedImage(img.dataset.identifier);
      });

      new_col.appendChild(img);
      row.appendChild(new_col);
    });
}

function clickedImage(id) {
  localStorage.setItem("search_id", id);
  window.location.href = "description.html";
}

function displayBookmarks() {
  // Array of unique movie id
  //let bookmarks_array = JSON.parse(localStorage.getItem("bookamrks"));
  if (localStorage.getItem("user_bookmarks") != "") {
    let bookmarks_array = localStorage.getItem("user_bookmarks").split("*");
    
    // iterate through each movie id, and display the movie to the watchlist page
    if (bookmarks_array.length !=0){
    for (let i = 0; i < bookmarks_array.length; i++) {
      addNewMovie(bookmarks_array[i]);
    }
    }
  }
}

window.onload = function () {
  displayBookmarks();
};
