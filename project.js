
import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.replace("signin.html");
    return;
  }

  const welcome = document.getElementById("welcomeUser");

  if (welcome) {
    welcome.textContent =
      "Welcome, " + (user.displayName || user.email);
  }

});

logoutBtn?.addEventListener("click", async () => {

  try {
    await signOut(auth);
    window.location.replace("signin.html");
  } catch (error) {
    alert("Unable to sign out. Please try again.");
  }

});
