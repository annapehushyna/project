class TeamMember extends HTMLElement {
  constructor() {
    super();
    const template = `
        <div class="TeamMember__info">
        <img src="${this.getAttribute("image")}">
        <h4>${this.getAttribute("title")}</h4> 
        <p>${this.getAttribute("text")}</p>
        </div>
        <div class="TeamMember__links">
        <a href="#"><img src="images/facebook_black.svg"></a>
        <a href="#"><img src="images/twitter_black.svg"></a>
        <a href="#"><img src="images/instagram_black.svg"></a>
        <a href="#"><img src="images/linkedin_black.svg"></a>
        </div>
        `;
    this.innerHTML = template;
  }
  static get observedAttributes() {
    return ["image", "title", "text"];
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case "image":
        this.querySelector("img").src = newVal;
        break;
      case "title":
        this.querySelector("h4").textContent = newVal;
        break;
      case "text":
        this.querySelector("p").textContent = newVal;
        break;
    }
  }
}
customElements.define("team-member", TeamMember);
