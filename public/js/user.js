async function validateRegisterForm(data) {
  const errors = {
    nameInput: validateName(data.name),
    avatarInput: validateAvatar(data.avatar),
    emailInput: await validateEmail(data.email),
    "pass-1": validatePassword(data.password),
    "pass-2": validateSecondPassword(data.password, data.passwordRepeat)
  };

  return errors;
}

async function validateLoginForm(data) {
  const errors = {
    emailLogin: await validateEmail(data.email, true),
    passwordLogin: validatePassword(data.password, true)
  };

  return errors;
}

function validatePassword(value, skipFormatValidation = false) {
  const errors = [];
  const re = /[a-zA-Z]\d|\d[a-zA-Z]/i;
  if (!value) {
    errors.push("Password is required");
  } else if (!skipFormatValidation && !(re.test(value) && value.length >= 6)) {
    errors.push(
      "Password should contain at least 6 symbols, at least one of them shoud be letter and digital"
    );
  }
  return errors;
}
function validateSecondPassword(value1, value2) {
  const errors = [];
  if (value1 !== value2) {
    errors.push("Passwords shoud match");
  }
  return errors;
}

function validateName(value) {
  const errors = [];
  if (!value) {
    errors.push("Name is required");
  }
  return errors;
}

function validateAvatar(value) {
  const errors = [];
  if (!value) {
    errors.push("Avatar is required");
  } else {
    if (value.type.indexOf("image") === -1) {
      errors.push("Selected file should be an image.");
    }
    if (value.size > 500000) {
      errors.push("Selected file should be less than ~500KB.");
    }
  }
  return errors;
}

async function validateEmail(value, skipTakenValidation = false) {
  const errors = [];
  const re = /\S+@\S+\.\S+/;
  if (!value) {
    errors.push("Email is required");
  } else if (!re.test(value)) {
    errors.push("Entered text should be an email");
  } else if (!skipTakenValidation && (await isEmailTaken(value))) {
    errors.push("Email already taken");
  }

  return errors;
}

async function blobToBase64(avatar) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}

const apiUrl = "https://fea13-ann.glitch.me/users";

async function saveUser(data) {
  const body = {
    name: data.name,
    email: data.email,
    passwordHash: Sha256.hash(data.password),
    avatar: await blobToBase64(data.avatar)
  };

  try {
    const resp = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(body)
    });
    return await resp.json();
  } catch (err) {
    alert("Cannot save user");
  }
}

async function logInUser(data) {
  const params = {
    email: data.email,
    passwordHash: Sha256.hash(data.password)
  };
  return (await getUsers(params))[0];
}

async function getUsers(params) {
  const rawQuery = [];
  for (const field in params) rawQuery.push(`${field}=${params[field]}`);
  const url = `${apiUrl}?${rawQuery.join("&")}`;
  try {
    const resp = await fetch(url, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
    return await resp.json();
  } catch (err) {
    alert(`Cannot get users by ${JSON.stringify(params)}`);
  }
}

async function getUserById(id) {
  try {
    const resp = await fetch(`${apiUrl}/${id}`, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
    return await resp.json();
  } catch (err) {
    alert("Cannot get user with id " + id);
  }
}

async function isEmailTaken(email) {
  const usersWithSuchEmail = await getUsers({ email });
  return !!usersWithSuchEmail.length;
}

function setCurrentUser(user) {
  window.currentUser = user;
  setUserCookies(user);
  showUserInfo(user);
}

function showUserInfo(user) {
  document.querySelector(".HeaderTop__authActions").style.display = "none";

  const userInfoEl = document.querySelector(".UserInfo");
  userInfoEl.querySelector("h4").textContent = user.name;
  userInfoEl.querySelector("img").src = user.avatar;
  userInfoEl.style.display = "flex";
}

function hideUserInfo() {
  const userInfoEl = document.querySelector(".UserInfo");
  userInfoEl.querySelector("h4").textContent = "";
  userInfoEl.querySelector("img").src = "null";
  userInfoEl.style.display = "none";

  document.querySelector(".HeaderTop__authActions").style.display = "block";
}

function setUserCookies(user) {
  document.cookie = `userId=${user.id}`;
  document.cookie = `userPass=${user.passwordHash}`;
}

function getUserCookies() {
  return document.cookie.split("; ").reduce((acc, curr) => {
    const [field, value] = curr.split("=");
    acc[field] = value;
    return acc;
  }, {});
}

function logOut() {
  document.cookie = `userId=`;
  document.cookie = `userPass=`;

  hideUserInfo();
}

async function initUser() {
  const { userId } = getUserCookies();
  if (!userId) {
    return;
  }
  setCurrentUser(await getUserById(userId));
}
initUser();
