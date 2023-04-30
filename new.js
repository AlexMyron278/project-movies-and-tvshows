const API_KEY = "ccde456b58f5587d49750d0077c801b3";
const API_CALL = "api_key=ccde456b58f5587d49750d0077c801b3";
const NORM_LINK = "https://api.themoviedb.org/3/";

window.onload = function () {
  getNewReleases(); 
};

function getNewReleases() {
  let url =
    "https://api.themoviedb.org/3/movie/now_playing?" +
    API_CALL +
    "&language=en-US&page=1";
  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      displayNewReleases(data.results);
    });
}

function displayNewReleases(results){
  let j = 0;
  let checked_results = [];
  for (let i = 0; i < results.length; i++) {
    if (results[i].poster_path == null || results[i].overview == "") {
      continue;
    } else {
      checked_results[j] = results[i];
      j += 1;
    }
  }

  if (checked_results.length < 15) {
    for (let i = 15; i > checked_results.length; i--) {
      document.getElementById("g" + i).style.display = "none";
      document.getElementById("land_caption" + i).style.display = "none";
    }
  }
  for (let i = 0; i < 15; i++) {
    document.getElementById("g" + (i + 1)).src =
      "https://image.tmdb.org/t/p/w500/" + checked_results[i].poster_path;
    document.getElementById("g" + (i + 1)).dataset.identifier =
      checked_results[i].title;
    document.getElementById("g" + (i+1)).dataset.id = checked_results[i].id; 
    document.getElementById("land_caption" + (i + 1)).innerHTML =
      checked_results[i].title;
  }
}
function clickedImage(id) {
  localStorage.setItem(
    "search_id",
    document.getElementById(id).dataset.id
  );
  window.location.href = "description.html";
}

