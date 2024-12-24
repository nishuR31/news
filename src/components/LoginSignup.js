import React, { useState, useEffect } from "react";
import { auth, googleProvider, githubProvider, gitlabProvider, firefoxProvider } from "../firebaseConfig";
import { signInWithPopup, signOut, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const LoginSignup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handlePhoneLogin = async () => {
    const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
      callback: (response) => {
        console.log("Recaptcha verified");
      },
    }, auth);

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setIsCodeSent(true);
      window.confirmationResult = confirmationResult;
      console.log("Verification code sent");
    } catch (error) {
      console.error("Error sending code:", error);
    }
  };

  const verifyCode = async () => {
    const code = verificationCode;
    try {
      const result = await window.confirmationResult.confirm(code);
      console.log("Phone login successful:", result.user);
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      setUser(null); // Clear the user state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login / Signup</h1>

      {!user ? (
        <>
          <button onClick={() => signIn(googleProvider)}>Sign in with Google</button>
          <button onClick={() => signIn(githubProvider)}>Sign in with GitHub</button>
          <button onClick={() => signIn(gitlabProvider)}>Sign in with GitLab</button>
          <button onClick={() => signIn(firefoxProvider)}>Sign in with Firefox</button>
          <button onClick={() => alert("Opera Login Coming Soon!")}>Sign in with Opera</button>
          
          <h2>Or log in with Phone Number</h2>
          {!isCodeSent ? (
            <>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
              />
              <button onClick={handlePhoneLogin}>Send Code</button>
              <div id="recaptcha-container"></div>
            </>
          ) : (
            <>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
              />
              <button onClick={verifyCode}>Verify Code</button>
            </>
          )}
        </>
      ) : (
        <>
          <h2>Welcome, {user.displayName || user.phoneNumber}</h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      )}
    </div>
  );
};

export default LoginSignup;
