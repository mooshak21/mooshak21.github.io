const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Looping through images */
const images = [
  "images/pic1.jpg",
  "images/pic2.jpg",
  "images/pic3.jpg",
  "images/pic4.jpg",
  "images/pic5.jpg"
];
images.forEach(image => {
  const newImage = document.createElement("img");
  newImage.setAttribute("src", image);
  thumbBar.appendChild(newImage);
  newImage.onclick = function() {
    displayedImage.setAttribute("src", image);
  };
});

/* Wiring up the Darken/Lighten button */
btn.onclick = function() {
  if (btn.getAttribute("class") == "dark") {
    btn.setAttribute("class", "light");
    btn.innerHTML = "Lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  } else {
    btn.setAttribute("class", "dark");
    btn.innerHTML = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }
};
