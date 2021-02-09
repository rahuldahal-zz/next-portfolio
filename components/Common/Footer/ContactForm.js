import Button from "@components/Common/Button/Button";
import React, { useEffect, useRef, useState } from "react";
import isEmail from "validator/lib/isEmail";
import isAlpha from "validator/lib/isAlpha";
import isLength from "validator/lib/isLength";
import matches from "validator/lib/matches";

export function validate([nameValue, emailValue, messageValue]) {
  const ALPHA_NUMERIC_AND_SPACE = /^[a-z0-9\s]+$/i;
  const errorsArray = [];

  if (!isEmail(emailValue)) {
    errorsArray.push({
      field: "email",
      message: "Email is not of valid format",
    });
  }
  if (!isAlpha(nameValue, "en-US", { ignore: " -" })) {
    errorsArray.push({
      field: "name",
      message: "Name can only contain alphabets",
    });
  }
  if (matches(messageValue, ALPHA_NUMERIC_AND_SPACE)) {
    if (!isLength(messageValue, { min: 1, max: 250 })) {
      errorsArray.push({
        field: "message",
        message: "Message exceeds 250 characters",
      });
    }
  } else {
    errorsArray.push({
      field: "message",
      message: "Message can only contain alphabets, numbers and spaces",
    });
  }

  return errorsArray;
}

export default function ContactForm() {
  const [isValid, setIsValid] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const message = useRef(null);

  const refs = { name, email, message };

  function onFieldBlurHandler(e) {
    if (e.currentTarget.value === "") {
      setFieldFocused(null);
    }
  }

  function getFieldClassName(fieldName) {
    const { current } = refs[fieldName];
    if ((current && current.value !== "") || fieldFocused === fieldName) {
      return "contact__field contact__field--focused";
    }
    return "contact__field";
  }

  async function submitToServer([nameValue, emailValue, messageValue]) {
    const response = await fetch("/api/messenger", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        message: messageValue,
      }),
    });

    return response.status;
  }

  async function submitHandler(e) {
    e.preventDefault();
    const refsValue = Object.values(refs).map((ref) => ref.current.value);
    const [nameValue, emailValue, messageValue] = refsValue;
    if (!nameValue || !emailValue || !messageValue) {
      errors.push({ field: "", message: "please fill out all the fields" });
    } else {
      const errors = validate(refsValue);
      if (errors.length === 0) {
        setIsValid(true);
        const status = await submitToServer(refsValue);
        console.log(status);

        // TODO: based on the status, handle the query
      }
    }
  }

  return (
    <div className="contact">
      <h4>Contact Me</h4>
      <form
        action=""
        className="contact__form"
        onSubmit={(e) => submitHandler(e)}
      >
        <div className={getFieldClassName("name")}>
          <label htmlFor="name">Name</label>
          <input
            ref={name}
            type="text"
            id="name"
            name="name"
            onFocus={() => setFieldFocused("name")}
            onBlur={(e) => onFieldBlurHandler(e)}
          />
        </div>
        <div className={getFieldClassName("email")}>
          <label htmlFor="email">Email</label>
          <input
            ref={email}
            type="email"
            id="email"
            name="email"
            onFocus={() => setFieldFocused("email")}
            onBlur={(e) => onFieldBlurHandler(e)}
          />
        </div>
        <div className={getFieldClassName("message")}>
          <label htmlFor="message">Message</label>
          <textarea
            ref={message}
            name="message"
            id="message"
            cols="30"
            rows="10"
            onFocus={() => setFieldFocused("message")}
            onBlur={(e) => onFieldBlurHandler(e)}
          />
        </div>

        <Button
          type="submit"
          textContent={isValid ? "Sending..." : "Send"}
          fill="filled"
          modifier="contact__submit"
        />
      </form>
    </div>
  );
}
