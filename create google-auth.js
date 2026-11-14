
import { auth } from "./firebase.js";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const provider = new GoogleAuthProvider();

// Ask Google to let the user choose an account.
provider.setCustomParameters({
  prompt: "select_account"
});

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log("Google login successful:", user.email);

    window.location.href = "quotation.html";

  } catch (error) {
    console.error("Google Sign In Error:", error);

    if (error.code === "auth/popup-closed-by-user") {
      throw new Error("Google sign-in was cancelled.");
    }

    if (error.code === "auth/popup-blocked") {
      throw new Error("Your browser blocked the Google sign-in popup.");
    }

    throw new Error("Google sign-in failed. Please try again.");
  }
}
