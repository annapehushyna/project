class LogIn extends HTMLElement {
  constructor() {
    super();
    const template = `
          <button class="AuthButton">Log In</button>
          <section class="Modal">
          <span class="Modal__close">&#x2715;</span>
          <form class="Modal__content" id="loginForm">
          <p class="FieldError"></p>
          <label>Email</label>
          <input id="emailLogin" name="email" placeholder="Enter your email">
          <p class="FieldError"></p>
          <label>Password</label>
          <input type="password" id="passwordLogin" placeholder="Password">
          <p class="FieldError"></p>
          <button class="AuthSubmitButton" type="submit">Log In</button>
          </form>
          </section>
          `;
    this.innerHTML = template;
  }

  getUserData() {
    const data = {
      email: this.querySelector("#emailLogin").value.trim(),
      password: this.querySelector("#passwordLogin").value.trim()
    };

    return data;
  }

  connectedCallback() {
    this.querySelector(".AuthButton").addEventListener("click", e => {
      this.querySelector(".Modal").classList.add("Modal--opened");
      document.body.style.overflow = "hidden";
    });
    this.querySelector(".Modal__close").addEventListener(
      "click",
      this.closeModal
    );
    this.querySelector("#emailLogin").addEventListener("blur", async e => {
      const email = e.target.value.trim();
      const errors = await validateEmail(email, true);
      this.showFieldErrors("emailLogin", errors);
    });
    this.querySelector("#passwordLogin").addEventListener("blur", e => {
      const pass = e.target.value.trim();
      const errors = validatePassword(pass, true);
      this.showFieldErrors("passwordLogin", errors);
    });

    this.querySelector("form").addEventListener("submit", this.submitForm);
  }

  showFieldErrors = (fieldId, errors) => {
    this.querySelector(`#${fieldId} + .FieldError`).innerHTML = errors.join(
      "<br/>"
    );
  };

  resetForm() {
    this.querySelectorAll(".FieldError").forEach(elem => (elem.innerHTML = ""));

    this.querySelector("#emailLogin").value = "";
    this.querySelector("#passwordLogin").value = "";
  }

  validateForm = async () => {
    const data = this.getUserData();
    let isValid = true;
    const errors = await validateLoginForm(data);
    for (const fieldId in errors) {
      if (errors[fieldId].length) {
        isValid = false;
      }
      this.showFieldErrors(fieldId, errors[fieldId]);
    }
    return { isValid, data, errors };
  };

  showLoginError(message) {
    this.querySelector(".FieldError:first-child").innerHTML = message;
  }

  closeModal = () => {
    this.resetForm();
    this.querySelector(".Modal").classList.remove("Modal--opened");
    document.body.style.overflow = "";
  };

  submitForm = async e => {
    e.preventDefault();
    const { isValid, data } = await this.validateForm();
    if (!isValid) {
      return;
    }

    const user = await logInUser(data);
    if (!user) {
      this.showLoginError("Incorrect email or password");
      return;
    }

    this.showLoginError("");
    setCurrentUser(user);
    this.closeModal();
  };
}

customElements.define("log-in", LogIn);
