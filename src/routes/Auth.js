import React from "react";
import EmailForm from "components/EmailForm";
import SocialForm from "components/SocialForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <EmailForm />
      <SocialForm />
    </div>
  );
};
export default Auth;
