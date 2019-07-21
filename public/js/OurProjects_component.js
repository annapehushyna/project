class OurProjects extends HTMLElement{
    constructor(){
        super()
        const template =`
        <div class="wrapper">
        <div class="WhatWeDo__center">
        <description-component
          image="./images/test-tube_icon.svg"
          title="Our Projects"
          text="Some of our awesome works. Proud of doing
          great works for our clients">
          </description-component>
          </div>
          <div class="OurProjects_btns">
          <button>All</button>
          <button>Mobile Apps</button>
          <button>Identities</button>
          <button>Interior Design</button>
          <button>UI/UX</button>
          </div>
          <div class="OurProjects_cont">
          <project-component image="./images/Ibhaar-img.svg"></project-component>
          <project-component image="./images/modern-soccer-img.svg"></project-component>
          <project-component image="./images/safety-img.svg"></project-component>
          <project-component image="./images/muafa-img.svg"></project-component>
          <project-component image="./images/open-access-img.svg"></project-component>
          <project-component image="./images/carezma-img.svg"></project-component>
          <project-component image="./images/blue-gray-img.svg"></project-component>
          <project-component image="./images/muafa-img.svg"></project-component>
          </div>
          </div>
        `
        this.innerHTML = template 
    }
}
customElements.define ("our-projects", OurProjects)