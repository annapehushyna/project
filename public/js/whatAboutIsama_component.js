class WhatAbout extends HTMLElement{
    constructor(){
        super()
        const template =`
        <div class="wrapper">
        <description-component
          image="./images/lamp_icon.svg"
          title="What about ISAMA"
          text="ISAMA is a marketing foundation located in Riyadh built on the talent of creation that leads to a modern concept of professionalism. At ISAMA we believe even if you are good at what you do, you have a great product or you provide an excellent service. We still can present you a little better to the world, creating your full identity, provides you with your marketing plans, design your website, print your publications, design your logo’s and offices. Simply we give your business the perfect image.
        "
        ></description-component>
        <description-component
          image="./images/tree_icon.svg"
          title="Why we exist"
          text="Reaching customer satisfaction through providing them with cutting-edge technologies that give clients access to a wide range of tools, ensuring efficient and results-oriented communication solutions, which grant them a special character that distinguishes them from the others in the business."

        ></description-component>
        </div>
        `
        this.innerHTML = template 
    }
}
customElements.define ("what-about", WhatAbout)