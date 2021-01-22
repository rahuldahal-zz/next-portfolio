const dev = process.env.NODE_ENV === "production";

export const server = dev
  ? "https://rahuldahal.com.np"
  : "http://localhost:3333";
