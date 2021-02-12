export default function getTokenFromHeader(req) {
  const { authorization } = req.headers;
  if (!authorization) {
    return null;
  }
  return authorization.split(" ")[1];
}
