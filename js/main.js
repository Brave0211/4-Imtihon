let elUser = document.querySelector(".user")
let elUSerTemplate = document.querySelector(".template-user").content
let elPost = document.querySelector(".post")
let elPostTemplate = document.querySelector(".template-post").content;
let elComment = document.querySelector(".comment")
let elCommentTemplate = document.querySelector( ".template-comment").content;
let elLoad = document.querySelector(".js-load")


let userId = [];
let fragment = document.createDocumentFragment();

function renderUsers(array,node){
    array.forEach(el =>{
      const templateUser = elUSerTemplate.cloneNode(true);
      userId.push(el.id);
      templateUser.querySelector(".user__item").dataset.id = el.id;
      templateUser.querySelector(".user__uname").textContent = `Username: ${el.username}`;
      templateUser.querySelector(".user__name").textContent = el.name;
      templateUser.querySelector(".user__id").textContent = el.id;
      templateUser.querySelector(".user__street").textContent = `Street: ${el.address.street}`;
      templateUser.querySelector(".user__suite").textContent = `Suite: ${el.address.suite}`;
      templateUser.querySelector(".user__city").textContent = `City: ${el.address.city}`;
      templateUser.querySelector(".user__zipcode").textContent = `Zipcode: ${el.address.zipcode}`;
      templateUser.querySelector(".user__title").textContent = `Compony name: ${el.company.name}`;
      templateUser.querySelector(".user__phrase").textContent = `CatchPharse: ${el.company.catchPhrase}`;
      templateUser.querySelector(".user__bs").textContent = `Bs: ${el.company.bs}`;
      templateUser.querySelector(".user__phone").textContent = `Tel: ${el.phone}`;
      templateUser.querySelector(".user__phone").href = `tel:${el.phone}`;
      templateUser.querySelector(".user__geo").textContent = "Location";
      templateUser.querySelector(".user__geo").href = `https://google.com/maps/place/${el.address.geo.lat},${el.address.geo.lng}`;
      templateUser.querySelector(".user__website").textContent = `Website: ${el.website}`;
      templateUser.querySelector(".user__website").href = `https://${el.website}`;
      templateUser.querySelector(".user__email").textContent = `Email: ${el.email}`;
      templateUser.querySelector(".user__email").href = `mailto:${el.email}`;
      
      fragment.appendChild(templateUser);
    })
  
  node.appendChild(fragment)
}

async function getUser(){
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const data = await res.json()
  renderUsers(data,elUser)
}
getUser()

let postId = [];
let fragment2 = document.createDocumentFragment();

function renderPost(array, node){
    node.innerHTML = "";
    array.forEach((el) => {
      postId.push(el.id);
      const templatePost = elPostTemplate.cloneNode(true);
      templatePost.querySelector(".post__title").textContent = el.title;
      templatePost.querySelector(".post__text").textContent = el.body;
      templatePost.querySelector(".post__item").dataset.id = el.id;
      
      fragment2.appendChild(templatePost);
    });
  
  node.appendChild(fragment2);
};

async function getPost(userId){
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  const data = await res.json();
  renderPost(data, elPost);
};

elUser.addEventListener("click", (evt) => {
  elLoad.style.display = "none"
  elPost.style.display = "block"
  if (evt.target.matches(".user__item")) {
    const usersListItemId = evt.target.dataset.id  - 0;
    userId.forEach((el) => {
      if (usersListItemId === el) {
        getPost(el);
      }
    });
  }
});

const fragment3 = document.createDocumentFragment();

const renderComments = (array, element) => {
  element.innerHTML = "";
  if (array.length > 0) {
    array.forEach((e) => {
      const newTemplateComment = elCommentTemplate.cloneNode(true);
      newTemplateComment.querySelector(".comment__name").textContent = e.name;
      newTemplateComment.querySelector(".comment__email").textContent = e.email;
      newTemplateComment.querySelector(".comment__email").href = `mailto:${e.email}`;
      newTemplateComment.querySelector(".comment__text").textContent = e.body;
      
      fragment3.appendChild(newTemplateComment);
    });
  }
  element.appendChild(fragment3);
};

async function getComment(postId){
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const data = await res.json();
    renderComments(data, elComment);
  };
  
  elPost.addEventListener("click", (evt) => {
    elLoad.style.display = "none"
    elComment.style.display = "block"
    if (evt.target.matches(".post__item")) {
      const postsListItemId = evt.target.dataset.id - 0;
      postId.forEach((el) => {
        if (postsListItemId === el) {
          getComment(el);
        }
      });
    }
  });
  