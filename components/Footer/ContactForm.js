import Button from "@components/Button";
import React, { useEffect, useRef, useState } from "react";
import isEmail from "validator/lib/isEmail";
import isAlpha from "validator/lib/isAlpha";
import isLength from "validator/lib/isLength";
import matches from "validator/lib/matches";

export function validate([nameValue, emailValue, messageValue]) {
  const SENTENCE_TOKENS = /^[a-z0-9\s,.?""''!]+$/i;
  const errorsArray = [];

  if (nameValue === "") {
    errorsArray.push({
      field: "name",
      message: "You must fill out your name",
    });
  }

  if (emailValue === "") {
    errorsArray.push({
      field: "email",
      message: "You must fill out your email",
    });
  }

  if (messageValue === "") {
    errorsArray.push({
      field: "message",
      message: "State briefly about your requirements",
    });
  }

  // return immediately with the array
  if (!nameValue || !emailValue || !messageValue) {
    return errorsArray;
  }

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
  if (matches(messageValue, SENTENCE_TOKENS)) {
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
  const [formState, setFormState] = useState("default");
  const [resetForm, setResetForm] = useState(false);
  const [setFieldFocused] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const message = useRef(null);

  const refs = { name, email, message };

  useEffect(() => {
    if (resetForm) {
      document.querySelector(".contact__form").reset();
      setFieldFocused(null);
    }
  }, [resetForm]);

  function setFieldError({ field, errorMessage, unset = false }) {
    setFormState("default");
    console.log({ field });
    const { dataset } = field;
    if (unset) {
      field.classList.remove("errorInInput");
      dataset.errorMessage = "";
    } else {
      field.classList.add("errorInInput");
      dataset.errorMessage = errorMessage;
    }
  }

  function onFieldFocusHandler(e) {
    const { parentElement } = e.currentTarget;
    parentElement.classList.add("contact__field--focused");
    setFieldError({ field: parentElement, unset: true });
  }

  function onFieldBlurHandler(e) {
    const { currentTarget } = e;
    if (currentTarget.value === "") {
      currentTarget.parentElement.classList.remove("contact__field--focused");
    }
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

  function getErrorInputRefs(errors) {
    return errors.map((error) => {
      const { field, message: errorMessage } = error;
      let toReturn;
      switch (field) {
        case "name":
          toReturn = { element: name.current, errorMessage };
          break;
        case "email":
          toReturn = { element: email.current, errorMessage };
          break;
        case "message":
          toReturn = { element: message.current, errorMessage };
          break;
        default:
          toReturn = {};
          break;
      }
      return toReturn;
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const refsValue = Object.values(refs).map((ref) => ref.current.value);
    const errors = validate(refsValue);
    if (errors.length === 0) {
      setFormState("valid");
      const status = await submitToServer(refsValue);
      if (status === 202) {
        setFormState("submitted");
        setResetForm(true);
      }
    } else {
      const errorInputRefs = getErrorInputRefs(errors);
      errorInputRefs.forEach((ref) => {
        const { element, errorMessage } = ref;
        setFieldError({ field: element.parentElement, errorMessage });
      });
    }
  }

  function InputField({ fieldName, type, reference }) {
    const lowercaseName = fieldName.toLowerCase();

    return (
      <div className="contact__field">
        <label htmlFor={lowercaseName}>{fieldName}</label>
        {type === "textarea" ? (
          <textarea
            ref={reference}
            id={lowercaseName}
            name={lowercaseName}
            cols="30"
            rows="10"
            onFocus={(e) => onFieldFocusHandler(e)}
            onBlur={(e) => onFieldBlurHandler(e)}
          />
        ) : (
          <input
            ref={reference}
            type={type}
            id={lowercaseName}
            name={lowercaseName}
            onFocus={(e) => onFieldFocusHandler(e)}
            onBlur={(e) => onFieldBlurHandler(e)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="contact">
      <h3>Contact Me</h3>
      <form
        action=""
        className="contact__form"
        onSubmit={(e) => submitHandler(e)}
      >
        <InputField fieldName="Name" type="text" reference={name} />
        <InputField fieldName="Email" type="email" reference={email} />
        <InputField fieldName="Message" type="textarea" reference={message} />

        <Button
          type="submit"
          textContent={formState === "valid" ? "Sending..." : "Send"}
          fill="filled"
          modifier="contact__submit"
        />
      </form>
    </div>
  );
}
