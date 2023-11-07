import React, { useEffect, useState, useCallback } from "react";
import Cropper from 'react-easy-crop';

import "./CropLogo.scss";

const CropLogo = ({image, setCropData}) => {

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [stringImage, setStringImage] = useState()
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log( croppedAreaPixels);
    setCropData(croppedAreaPixels)
  }, []);

  useEffect(() => {
    image.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setStringImage(reader.result)
      };
      setStringImage(reader.readAsDataURL(file));
      return file;
    })
  }, [image])

  return (
    <div className="crop-logo">
      <div className="crop-area-outer">
        <div className="crop-area">
          <Cropper
            image={stringImage}
            crop={crop}
            zoom={zoom}
            aspect={ 1/1 }
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </div>
      <div className="controls">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value)
          }}
          className="zoom-range"
        />
      </div>
    </div>
  );
}

export default CropLogo;
