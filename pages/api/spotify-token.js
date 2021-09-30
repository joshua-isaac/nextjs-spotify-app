const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export default async function handler(req, res) {
  // set up query string
  let queryString = `grant_type=refresh_token&refresh_token=${refresh_token}`;

  // make new url search params with query string
  const params = new URLSearchParams(queryString);

  // get access token
  const getAccessToken = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  // de-construct access token from json
  const { access_token } = await getAccessToken.json();

  // return response
  res.status(200).json({ access_token: access_token });
}
