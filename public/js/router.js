const pathToTag = {
  "what-about": "what-about",
  "what-we-do": "what-we-do",
  "our-projects": "our-projects",
  "excellent-team": "excellent-team",
};

function changeRoute(elem, isPopState) {
  const container = document.querySelector(".MainContent");
  if (!container) return;

  const tag = elem || "home-page";
  if (!isPopState) {
    history.pushState({}, tag, tag);
  }

  container.innerHTML = `<${tag}></${tag}`;
}

window.onpopstate = function(event) {

  changeRoute(pathToTag[location.pathname.split("/")[1]], true);
};

changeRoute(pathToTag[location.pathname.split("/")[1]]);
