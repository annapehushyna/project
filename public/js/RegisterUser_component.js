class RegisterUser extends HTMLElement {
  constructor() {
    super();
    const template = `
        <button class="AuthButton">Sign Up</button>
        <section class="Modal">
        <span class="Modal__close">&#x2715;</span>
        <form class="Modal__content" id="registrationForm">
        <label>Name</label>
        <input id="nameInput" name="userName" placeholder="Enter your name">
        <p class="FieldError"></p>
        <label>Email</label>
        <input id="emailInput" name="email" placeholder="Enter your email">
        <p class="FieldError"></p>
        <label>Password</label>
        <input type="password" id="pass-1" placeholder="Set your password">
        <p class="FieldError"></p>
        <input type="password" id="pass-2" placeholder="Password confirmation">
        <p class="FieldError"></p>
        <img src="./images/avatar_icon.png" id="userPhoto">
        <label for="avatarInput" id="selectLabel"><span>Select avatar</span></label>
        <input type="file" name="file"  class="Hide" class="Input_File" id="avatarInput">
        <p class="FieldError" style="text-align: center;"></p>
        <button class="AuthSubmitButton" type="submit">Register</button>
        </form>
        </section>
        `;
    this.innerHTML = template;
  }

  getUserData() {
    const data = {
      name: this.querySelector("#nameInput").value.trim(),
      email: this.querySelector("#emailInput").value.trim(),
      avatar: this.querySelector("#avatarInput").files[0],
      password: this.querySelector("#pass-1").value.trim(),
      passwordRepeat: this.querySelector("#pass-2").value.trim()
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
    this.querySelector("#avatarInput").addEventListener("change", e => {
      const avatar = e.target.files[0];
      const span = this.querySelector("#selectLabel > span");
      if (avatar) {
        span.textContent = avatar.name;
        span.setAttribute("title", avatar.name);

        const errors = validateAvatar(avatar);
        this.showFieldErrors("avatarInput", errors);
        this.querySelector("#userPhoto").setAttribute(
          "src",
          errors.length
            ? "./images/avatar_icon.png"
            : URL.createObjectURL(avatar)
        );
      } else {
        span.textContent = "Select avatar";
      }
    });
    this.querySelector("#nameInput").addEventListener("blur", e => {
      const name = e.target.value.trim();
      const errors = validateName(name);
      this.showFieldErrors("nameInput", errors);
    });
    this.querySelector("#emailInput").addEventListener("blur", async e => {
      const email = e.target.value.trim();
      const errors = await validateEmail(email);
      this.showFieldErrors("emailInput", errors);
    });
    this.querySelector("#pass-1").addEventListener("blur", e => {
      const pass = e.target.value.trim();
      const errors = validatePassword(pass);
      this.showFieldErrors("pass-1", errors);
    });
    this.querySelector("#pass-2").addEventListener("blur", e => {
      const pass = this.querySelector("#pass-1").value.trim();
      const pass2 = e.target.value.trim();
      const errors = validateSecondPassword(pass, pass2);
      this.showFieldErrors("pass-2", errors);
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

    this.querySelector("#nameInput").value = "";
    this.querySelector("#emailInput").value = "";
    this.querySelector("#pass-1").value = "";
    this.querySelector("#pass-2").value = "";
    this.querySelector("#avatarInput").value = "";
    this.querySelector("#selectLabel > span").textContent = "Select avatar";
  }

  validateForm = async () => {
    const data = this.getUserData();
    let isValid = true;
    const errors = await validateRegisterForm(data);
    for (const fieldId in errors) {
      if (errors[fieldId].length) {
        isValid = false;
      }
      this.showFieldErrors(fieldId, errors[fieldId]);
    }
    return { isValid, data, errors };
  };

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

    setCurrentUser(await saveUser(data));
    this.closeModal();
  };
}

customElements.define("register-user", RegisterUser);
