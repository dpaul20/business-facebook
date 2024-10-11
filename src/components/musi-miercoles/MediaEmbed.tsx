import { useState, useEffect } from "react";

type MediaEmbedProps = {
  url: string;
};

export default function MediaEmbed({ url }: Readonly<MediaEmbedProps>) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isSpotify, setIsSpotify] = useState(false);

  useEffect(() => {
    if (url.includes("spotify.com")) {
      const spotifyId = url.split("/").pop()?.split("?")[0];
      setEmbedUrl(`https://open.spotify.com/embed/track/${spotifyId}`);
      setIsSpotify(true);
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtube.com")
        ? url.split("v=")[1]?.split("&")[0]
        : url.split("/").pop();
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
      setIsSpotify(false);
    }
  }, [url]);

  if (!embedUrl) return null;

  return (
    <div className={isSpotify ? "h-[152px]" : "aspect-video"}>
      <iframe
        title="Embedded media"
        style={{ borderRadius: isSpotify ? "12px" : "0" }}
        src={embedUrl}
        width="100%"
        height={isSpotify ? "152" : "100%"}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
