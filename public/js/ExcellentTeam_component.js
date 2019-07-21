class ExcellentTeam extends HTMLElement {
  constructor() {
    super();
    const template = `
    <div class="wrapper">
        <div class="WhatWeDo__center">
        <description-component
            image="images/man-icon.svg"
            title="Meet Our Team"
            text="We have highly qualified staff with distinguished significant 
            experiences in their field who work under pressure.">
        </description-component>
        </div>
        <div class="ExcellentTeam__members">
        <team-member
        image="./images/tamer-photo.jpg"
        title="Tamer"
        text="Senior Software Engineer">
        </team-member>
        <team-member
        image="./images/hazem-photo.jpg"
        title="Hazem"
        text="PHP Developer">
        </team-member>
        <team-member
        image="./images/mahammed-photo.jpg"
        title="Mohammed"
        text="PHP Developer">
        </team-member>
        <team-member
        image="./images/ahmed-photo.jpg"
        title="Ahmed"
        text="UI/UX Designer">
        </team-member>
        </div>
</div>
        `;
        this.innerHTML = template
  }
}
customElements.define("excellent-team", ExcellentTeam)
