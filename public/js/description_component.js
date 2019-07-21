class DescriptionComponent extends HTMLElement {
  constructor() {
    super();
    const template = `
        <img src="${this.getAttribute("image")}">
        <div class="ComponentCont">
        <h1>${this.getAttribute("title")}</h1> 
        <p>${this.getAttribute("text")}</p>
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
        this.querySelector("h1").textContent = newVal;
        break;
      case "text":
        this.querySelector("p").textContent = newVal;
        break;
    }
  }
}
customElements.define("description-component", DescriptionComponent);
