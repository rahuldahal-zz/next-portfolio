import Button from "@components/Common/Button/Button";
import Link from "@components/Common/Link/Link";
import React from "react";

export default function Messages({ data, token }) {
  const { messages: fetchedMessages } = data;

  async function deleteMessageHandler(id) {
    const res = await fetch("/api/messenger", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    console.log(res.status);
  }
  return (
    <div className="admin__messages">
      {fetchedMessages.map((fetchedMessage) => {
        const { name, email, message, date } = fetchedMessage.data;
        return (
          <div className="message" key={fetchedMessage.id}>
            <h5 className="message__name">{name}</h5>
            <p className="message__content">{message}</p>
            <em className="message__date">{date}</em>
            <div className="message__actions">
              <Link
                fill="outline"
                textContent="Send E-mail"
                to={`mailto:${email}`}
              />
              <Button
                fill="filled"
                textContent="Delete"
                onClick={() => deleteMessageHandler(fetchedMessage.id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
