class WhatWeDo extends HTMLElement{
    constructor(){
        super()
        const template =`
        <div class="wrapper">
        <div class="WhatWeDo__center">
        <description-component
          image="./images/target_icon.svg"
          title="What we do ?"
          text="Everything you need to do business intelligence right."
        ></description-component></div>
        <div class="WhatWeDo__cont">
        <description-component
          image="./images/tools_icon.svg"
          title="Web Design & Development"
          text="ISAMA Pvt. Ltd. designs and develops creative websites utilizing the latest technologies."
        ></description-component>
        <description-component
          image="./images/mobile_icon.svg"
          title="Mobile Applications"
          text="Our Developers helps you to Design, Develop & Distribute Mobile Applications - Smarter & Faster."
        ></description-component>
        <description-component
          image="./images/cube_icon.svg"
          title="Software Solutions"
          text="with our software for professional services and consulting firms. Grow your revenue and profit margins by assigning the right people to the right projects at the right time."
        ></description-component>
        <description-component
          image="./images/couch_icon.svg"
          title="Interior Design"
          text="We offer a variety of design services ranging from Full Service Interior Design and Styling to our Design Concierge service, all of which are executed with beautiful, custom-tailored results."
        ></description-component>
        <description-component
          image="./images/mouse_icon.svg"
          title="Branding"
          text="We have our forte in advertising and Brand establishment. We create identities for the clients product and services in the target market."
        ></description-component>
        <description-component
          image="./images/globe_icon.svg"
          title="SEO & Web Marketing Services"
          text="We offer a variety of design services ranging from Full Service Interior Design and Styling to our Design Concierge service, all of which are executed with beautiful, custom-tailored results."
        ></description-component>
        </div>
        </div>
        `
        this.innerHTML = template 
        
    }
}
customElements.define ("what-we-do", WhatWeDo)