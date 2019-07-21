class ProjectComponent extends HTMLElement{
    constructor(){
        super()
        const template =`
        <img class="ProjectComponent__img" src="${this.getAttribute("image")}">
        <div class="ProjectComponent__links">
        <a href="#"><img src="images/link_icon.svg"></a>
        <a href="#"><img src="images/plus_icon.svg"></a>
        </div>
        `
        this.innerHTML = template
    }
    static get observedAttributes() {
        return ["image"];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
              this.querySelector(".ProjectComponent__img").src = newVal
          }
    }

customElements.define("project-component", ProjectComponent);
