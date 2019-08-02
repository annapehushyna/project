class HeaderTopMenu extends HTMLElement {
  constructor() {
    super();
    const template = `
        <a href="#" class="HeaderTop__link">
            <img src="${this.getAttribute("icon")}">
            <p>${this.getAttribute("text")}</p>
        </a>
        `;
    this.innerHTML = template;
  }
  static get observedAttributes() {
    return ["icon", "text"];
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case "icon":
        this.querySelector("img").src = newVal;
        break;
      case "text":
        this.querySelector("p").textContent = newVal;
        break;
    }
  }
}
customElements.define("header-top-menu", HeaderTopMenu);
