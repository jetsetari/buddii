import React, { useState, useEffect, useRef } from "react";
import * as ml5 from "ml5";

import { useSelector } from "react-redux";
import { getUser } from "@data/redux/usersSlice";
import { updateSlideshow } from "@data/firebase/firestore/updateData";
import { saveSlide } from "@data/firebase/firestore/saveData";
import { getMainColor } from '@data/helpers';

//styling
import "./UploadLocalImage.scss";

const OpenAIApi = require('openai');
const openai = new OpenAIApi({
  apiKey: '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', 
  dangerouslyAllowBrowser: true
});

const UploadLocalImage = ({ slideshowId, saveSlideshowData }) => {

  const [dataUri, setDataUri] = useState(false);
  const [processText, setProcessText] = useState(false);
  const [aiResults, setAiResults] = useState([]);
  const [generatedImage, setGeneratedImage] = useState(false);
  const user_store = useSelector(getUser);
  const imgElement = useRef(null);


  const modelLoaded = () => {
    console.log('model loaded');
  }
  const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

  const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
  })

  const onChange = (file) => {
    if(!file) {
      setDataUri(false); return;
    }
    setGeneratedImage(false);
    setAiResults([]);
    fileToDataUri(file).then(dataFile => {
      setDataUri(dataFile);
    })
  }

  useEffect(async () => {
    if(dataUri){
      setProcessText('Analysing image...');
      const image = document.getElementById('image');      
      //setTimeout(async () =>{
        if(image){
          let Access_Key = 'l9xrqd2nQnEfjaCFDKxnfRTvyI2pS0C4NrSwvmsI0fs';

          classifier.predict(image, 5, async function(err, results) {
            // print the result in the console
            console.log(results);
            let ai_results = [];
            results.forEach((value, key) => {
              ai_results.push(value.className);
            });
            setAiResults(ai_results);
            setProcessText('Generating slides...');
            let subject = results[0].className;
            try {
              const result = await openai.chat.completions.create({
                model: "gpt-3.5-turbo", // Use "text-davinci-002" for GPT-3.5 Turbo
                //prompt: "Give me 'did you know' about the subject 'Tiger'. Please answer short",
                messages: [{"role": "user", "content": `Give me 'did you know' about the subject '${subject}'. Please answer short`}],
                temperature: 0.5,
                max_tokens: 256,
              });
              console.log(result);
              setProcessText(result.choices[0].message.content);
              let firstObj = false;
              const response = await openai.images.generate({
                prompt: subject,
                n: 5,
                size: "1024x1024",
              });
              console.log(response);
              response.data.forEach((obj, index)=> {
                if(!firstObj){
                  firstObj = obj;
                }
                console.log(index, obj, firstObj);
                setTimeout(function(){
                  setProcessText('Generating slides '+(Number(index)+1)+' from 5');
                  setGeneratedImage(obj.url);
                  let data = {
                    slide_i: (Number(index)+1),
                    created: new Date(),
                    created_by: '',
                    company_id: user_store.companies[0],
                    main_color: getMainColor(imgElement.current),
                    image : obj.url
                  }
                  saveSlide(slideshowId, data, (callback) => {
                    if((Number(index)+1) === 5){
                      updateSlideshow(slideshowId, { cover: firstObj.url }, (response) => {
                        saveSlideshowData();
                      });
                      setDataUri(false);
                    }
                  })
                }, 2500 * (index + 1));
              })
              console.log(response);
            } catch (e) {
              console.log(e);
              console.log("Something is going wrong, Please try again.");
            }


            // (async function() {
            //   try {
            //     const response = await fetch(
            //       `https://api.unsplash.com/search/photos?page=1&query=${results[0].className}&client_id=${Access_Key}&orientation=landscape`
            //     );
            //     let data = await response.json();
            //     let firstObj = false;
            //     data.results.forEach(function(obj, index) {
            //       if(!firstObj){
            //         firstObj = obj;
            //       }

            //         setTimeout(function(){
            //           setProcessText('Generating slides '+(Number(index)+1)+' from 10');
            //           setGeneratedImage(obj.urls.regular);
            //           let data = {
            //             slide_i: (Number(index)+1),
            //             created: new Date(),
            //             created_by: '',
            //             company_id: user_store.companies[0],
            //             main_color: getMainColor(imgElement.current),
            //             image : obj.urls.regular
            //           }
            //           saveSlide(slideshowId, data, (callback) => {
            //             if((Number(index)+1) === 10){
            //               updateSlideshow(slideshowId, { cover: firstObj.urls.regular }, (response) => {
            //                 saveSlideshowData();
            //               });
            //               setDataUri(false);
            //             }
            //           })
            //         }, 2500 * (index + 1));
            //     });
            //   } catch (e) {
            //       console.error(e);
            //   }
            // })();
          })
        }  
      //}, 3000);


      
    }
    
  }, [dataUri]);

  

  return (
    <div className="upload-localimage">
      <div className="upload-frame">
        { dataUri && <div className="upload-preview" style={{ backgroundImage: `url(${dataUri})` }}></div> }
        <input type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
      </div>
      { processText && <div className="upload-process">{ processText }</div> }
      {
        dataUri && (
          <div className="upload-slides">
            { generatedImage && <div className="generated-file" style={{ backgroundImage: `url(${generatedImage})` }}></div> }
            <ol>
              { aiResults.map((value, key) => {
                return <li>{ value }</li>
              }) }
            </ol>
          </div>
        )
      }
      { dataUri && <img ref={imgElement} height="800" width="600" id="image" src={dataUri} alt="avatar"/>}
  </div>
  );
}

export default UploadLocalImage;