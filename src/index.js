function validateNum(x) {
  return !(isNaN(x) || x < 1 || x > 10);
  
}

function validate() {
  let pages = parseInt(document.getElementById("pageNumber").value, 10);
  let limit = parseInt(document.getElementById("photoLimit").value, 10);
  let validatePages = validateNum(pages);
  let validateLimit = validateNum(limit);
  let postfix = "вне диапазона от 1 до 10";
  let prefix;

  if (!validatePages && !validateLimit) {
    prefix = "Номер страницы и лимит";
  } else if (!validatePages) {
    prefix = "Номер страницы";
  } else if (!validateNum) {
    prefix = "Лимит";
  }
  if (prefix) {
    console.log("Validation problem: " + prefix);
    return `${prefix} ${postfix}`;
  }
}

function preparePhotos(data) {
  console.log("Prepare images from data: ", data);
  let images = "";
  data.forEach((item) => {
    // console.log('image: ', item)
    const i = `<div class="imageplace"> 
      <p>Author: ${item.author}</p>
      <img src="${item.download_url}" class="image" alt="Image: ${item.download_url}"/>
    </div>`;
    images += i;
  });
  console.log("Got images: ", images);
  return images;
}

function getPhotos() {
  let pages = document.getElementById("pageNumber").value;
  let limit = document.getElementById("photoLimit").value;
  let url = `https://picsum.photos/v2/list?page=${pages}&limit=${limit}`;
  let resultPlace = document.getElementById("result");

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultPlace.innerHTML = preparePhotos(data);
      localStorage.clear();
      localStorage.setItem("photosSavedData", JSON.stringify(data));
    })
    .catch((err) => {
      console.log("Can't get data from URL: " + url, err);
    });
}

function run() {
  let result = document.getElementById("result");
  let validateText = validate();

  if (validateText) {
    result.innerHTML = `<p style="color: #ff0000;">${validateText}</p>`;
  } else {
    getPhotos();
  }
}

const button = document.getElementById("submit");
button.addEventListener("click", run);

let oldData = localStorage.getItem("photosSavedData");
if (oldData) {
  let images = preparePhotos(JSON.parse(oldData));
  let resultPlace = document.getElementById("result");
  resultPlace.innerHTML = images;
}
