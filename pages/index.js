import SpotifyPlayer from "react-spotify-web-playback";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  // token state
  const [token, setToken] = useState("");

  // get spotify token
  const getSpotifyToken = async () => {
    try {
      // fetch token
      const data = await fetch("/api/spotify-token");

      // get access token from json
      const { access_token } = await data.json();

      // set token state
      setToken(access_token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSpotifyToken();
  }, []);

  console.log(token);

  return (
    <div>
      <p>spotify token</p>
      {token && (
        <SpotifyPlayer
          token={token}
          uris={["spotify:playlist:7r5a2CO5oPl9oKZd5NY2U4"]}
          play="true"
          initialVolume={0.05}
          callback={(state) => console.log(state)}
        />
      )}
    </div>
  );
}
