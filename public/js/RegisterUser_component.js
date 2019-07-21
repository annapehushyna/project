class RegisterUser extends HTMLElement {
  constructor() {
    super();
    const template = `
        <section>
        <form>
        <label>Name</label>
        <input name="user-name" placeholder="Enter your name">
        <label>Email</label>
        <input name="email" placeholder="Enter your email">
        <label>Password</label>
        <input type="password" id="pass-1" placeholder="Set your password">
        <input type="password" id="pass-2" placeholder="Repeat your password" disabled="">
        <input type="hidden" value="" name="pass-hash">
        <input type="hidden" value="" name="user-photo">
        <img src="./images/avatar_icon.png" id="user-photo-preview">
        <label for="file">Select avatar</label>
        <input type="file" name="file" id="file">
        </form>
        <button id="register-button">Register</button>
        </section>
        <section id="userInfo">
        <h4></h4>
        <img src=null>
        </section>
        </body>
        `;
        this.innerHTML = template
  }
}
customElements.define("register-user", RegisterUser);
