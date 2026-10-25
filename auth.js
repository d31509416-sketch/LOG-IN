
import { auth } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Replace this with your published Google Sites HOME URL.
const HOME_URL = "PASTE_GOOGLE_SITES_HOME_URL";

const guest = document.getElementById("guest");
const member = document.getElementById("member");
const form = document.getElementById("authForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const heading = document.getElementById("heading");
const submitBtn = document.getElementById("submitBtn");
const toggleBtn = document.getElementById("toggleBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");

let creatingAccount = false;

function showMessage(text) {
  message.textContent = text;
}

function goHome() {
  if (HOME_URL === "PASTE_GOOGLE_SITES_HOME_URL") {
    showMessage("Please configure your HOME URL first.");
    return;
  }
  window.location.assign(HOME_URL);
}

toggleBtn.addEventListener("click", () => {
  creatingAccount = !creatingAccount;
  heading.textContent = creatingAccount
    ? "Create Account" : "Log In";
  submitBtn.textContent = creatingAccount
    ? "Create Account" : "Log In";
  toggleBtn.textContent = creatingAccount
    ? "Already have an account? Log In"
    : "Create an account";
  showMessage("");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitBtn.disabled = true;
  showMessage("Please wait...");

  try {
    if (creatingAccount) {
      await createUserWithEmailAndPassword(
        auth, email.value.trim(), password.value
      );
    } else {
      await signInWithEmailAndPassword(
        auth, email.value.trim(), password.value
      );
    }

    goHome();
  } catch (error) {
    showMessage(error.message);
  } finally {
    submitBtn.disabled = false;
  }
});

resetBtn.addEventListener("click", async () => {
  if (!email.value.trim()) {
    showMessage("Enter your email address first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email.value.trim());
    showMessage("If the account exists, check your email.");
  } catch (error) {
    showMessage(error.message);
  }
});

document.getElementById("homeBtn")
  .addEventListener("click", goHome);

document.getElementById("logoutBtn")
  .addEventListener("click", async () => {
    try {
      await signOut(auth);
      showMessage("Logged out successfully.");
      goHome();
    } catch (error) {
      showMessage(error.message);
    }
  });

onAuthStateChanged(auth, (user) => {
  guest.hidden = !!user;
  member.hidden = !user;

  if (user) {
    document.getElementById("welcome").textContent =
      `Signed in as ${user.email}`;
  }
});
