import jwt from "jsonwebtoken";

export default function Authenticate(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return reject("Invalid Token Received.");
      }

      return resolve("Authenticated Successfully");
    });
  });
}
