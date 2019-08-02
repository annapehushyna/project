class HomePage extends HTMLElement {
constructor(){
    super()
    const template = `
    <main>
    <div class="wrapper">
    <div class="HomePage__text">
    <p>LET’S DRAW SOME ARTS</p><b>&</b>
    <p>make your business much better</p>
    </div>
    <div class="HomePage__pictures">
    <img class="HomePage__img" src="./images/effective-art.jpg">
    <img class="HomePage__img" src="./images/phone-image.jpg">
    </div>
    </div>
    </main>
    `
    this.innerHTML = template
}


}


customElements.define("home-page", HomePage);