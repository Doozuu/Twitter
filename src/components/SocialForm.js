import React from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "fbase";

const SocialForm = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <div>
      <button onClick={onSocialClick} name="google">
        Continue with Google
      </button>
      <button onClick={onSocialClick} name="github">
        Continue with Github
      </button>
    </div>
  );
};

export default SocialForm;
