import React, { useEffect, useState } from "react";

import "./AddSlideshow.scss";
import TextInput from "@components/_default/TextInput";
import DropDown from "@components/_default/DropDown";
import DragDropInput from '@components/_default/DragDropInput/DragDropInput';
import UploadLocalImage from '@components/UploadLocalImage';
import PdfToImages from '@components/PdfToImages';
import * as ml5 from "ml5";

const AddSlideshow = ({setSlideshow, slideshow, slideshowId, saveSlideshowData}) => {

  const [privat, setPrivate] = useState('');
  const [image, setImage] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [aiImage, setAiImage] = useState(false);
  const [typeSlide, setTypeSlide] = useState(false);
  
  useEffect(() => {
    setSlideshow({ //@todo: rechten
      name: name, 
      image: image, 
      //locked: privat, 
      description: description,
    })
  }, [image, name, description])

  return (
    <div className="add-slideshow">
      { !slideshowId ? (
      <>
        <TextInput label="Name" placeholder="Give slideshow a name" value={name} onChange={setName}/>
        <TextInput label="Description" placeholder="Description of the slideshow" value={description} onChange={setDescription}/>
        {/*<div className="input text">
          <DropDown label="Access" options={[{ value: "private", label: "Private",}, { value: "public", label: "Public",}, { value: "shared", label: "Shared"}]} value={privat} onChange={(e) => setPrivate(e)} placeholder="Access" />
        </div>*/}
      </>
      ) : (
        <>
          { !typeSlide && (
            <div className="slideshow-type">
              <div className="option btn-pdf" onClick={ () => { setTypeSlide('pdf') } }>Upload Pdf</div>
              <div className="option btn-ai" onClick={ () => { setTypeSlide('ai') } }>Generate Template Slideshow</div>
            </div>)
          }
          { typeSlide && (typeSlide == 'pdf') && (
              <div className="upload">
                <div className="pdf-upload">
                  <label>Upload Pdf</label>
                  <PdfToImages slideshowId={slideshowId} saveSlideshowData={saveSlideshowData} />
                </div>
              </div>
            ) 
          }
          { typeSlide && (typeSlide == 'ai') && (
            <div>
              <UploadLocalImage saveSlideshowData={saveSlideshowData} slideshowId={slideshowId} />
            </div>
          )}
        </>
      )
    }
    </div>
  );
}

export default AddSlideshow;
