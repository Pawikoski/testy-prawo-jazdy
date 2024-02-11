import { useState } from "react";
import Image from "react-bootstrap/Image";


const Video = ({ className, src }) => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    showVideo ?
      <video disablePictureInPicture className="media" autoPlay><source src={src} /></video>
      :
      <Image onClick={() => setShowVideo(true)} className={className} title="Kliknij, aby wyświetlić film" src="https://placehold.co/600x400?text=Kliknij,+aby+wyświetlić+film." fluid />
  );
}


const MediaPlayer = ({ question, src }) => {
  return (
    src ?
      src.endsWith('.webp') ?
        <Image className="media" title={question} src={"/media" + src} fluid />
        :
        <Video className="media" src={"/media" + src} />
      :
      <Image className="media" title={question} src="https://placehold.co/600x400" fluid />
  );
}

export default MediaPlayer;