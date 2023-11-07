import React, { useEffect, useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '@data/firebase';
import { updateSlideshow } from "@data/firebase/firestore/updateData";
import { saveSlide } from "@data/firebase/firestore/saveData";
import { v4 } from "uuid";
import { getMainColor } from '@data/helpers';
import { useSelector } from "react-redux";
import { getUser } from "@data/redux/usersSlice";

import "./PdfToImages.scss";

const PDFJS = window.pdfjsLib;

function PdfToImages({ slideshowId, saveSlideshowData }) {
  const user_store = useSelector(getUser);
  const [pdf, setPdf] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfRendering, setPdfRendering] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [image, setImage] = React.useState("");
  const imgElement = useRef(null);
  const [percent, setPercent] = useState(false);
  const [error, setError] = useState(false);
  const [rendering, setRendering] = useState(false);

  async function showPdf(event) {
    try {
      setPdfRendering(true);
      const file = event.target.files[0];


      //----
      const pdfRef = ref(storage, `/slideshows/${slideshowId}/slideshow.pdf`);
      const uploadPdfTask = uploadBytesResumable(pdfRef, file);
      uploadPdfTask.on("state_changed", (snapshot) => {
        const _percent_ = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(_percent_);
      }, (err) => { console.log(err); }, () => {
        getDownloadURL(uploadPdfTask.snapshot.ref).then((url) => {
          updateSlideshow(slideshowId, { pdf: url }, (response) => {});
        });
      });
      //---

      const uri = URL.createObjectURL(file);
      var _PDF_DOC = await PDFJS.getDocument({ url: uri });
      setTotalPages(_PDF_DOC._pdfInfo.numPages);
      if(_PDF_DOC._pdfInfo.numPages > 25){
        alert('Max 25 pages allowed');
      } else {
        setPdf(_PDF_DOC);
        setPdfRendering(false);
        document.getElementById("file-to-upload").value = "";
      }
    } catch (error) { setError(error.message); }
  }

  const uploadPage = async () => {
    setRendering(true);
    let page = await pdf.getPage(currentPage);
    let viewport = page.getViewport(currentPage);
    let render_context = {
      canvasContext: document.querySelector("#pdf-canvas").getContext("2d"),
      viewport: viewport
    };
    setWidth(viewport.width);
    setHeight(viewport.height);
    page.render(render_context).then(() => {
      let canvas = document.getElementById("pdf-canvas");
      let img = canvas.toDataURL("image/jpeg", 0.1);
      setImage(img);
      canvas.toBlob(async function(blob){
        const myFile = new File([blob], v4()+'--'+currentPage+'.jpg', {
          type: blob.type,
        });
        console.log(myFile);
        await myFile;
        const storageRef = ref(storage, `/slideshows/${slideshowId}/${myFile.name}`);
        console.log(storageRef);
        const uploadTask = uploadBytesResumable(storageRef, myFile);
        console.log(uploadTask);
        await uploadTask.on("state_changed", (snapshot) => {
          const percent_ = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPercent(percent_);
        }, (err) => { 
          setError(err); 
        }, async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setPercent(false);
            let all_files = allFiles;
            setAllFiles(all_files);
            if(currentPage < totalPages){
              let data = {
                slide_i: currentPage,
                created: new Date(),
                created_by: '',
                company_id: user_store.companies[0],
                main_color: getMainColor(imgElement.current),
                image : url
              }
              saveSlide(slideshowId, data, (callback) => {
                all_files.push(url);
                setAllFiles(all_files);
                //setTimeout(()=> {
                  setCurrentPage(currentPage+1);
                //}, 750);
              })
            } else {
              //@todo: close slideshow
              updateSlideshow(slideshowId, { cover: allFiles[0] }, (response) => {
                saveSlideshowData();
              });
            }      
          });
        });
      },'image/jpeg');
    })
    
  }

  useEffect(() => {
    pdf && uploadPage();
  }, [pdf, currentPage]);

  return (
    <div className="pdf-toimages">
      <div className={ rendering ? 'hidden' : 'show'}>
        <button id="upload-button" onClick={() => document.getElementById("file-to-upload").click()}>
          Select PDF
        </button>
        <input type="file" id="file-to-upload" accept="application/pdf" hidden onChange={showPdf}/>
      </div>
      <div id="pdf-main-container" className={ !rendering ? 'hidden' : 'show'} >
        <div id="pdf-loader" hidden={!pdfRendering}>Loading document ...</div>
        <div id="pdf-contents" hidden={!allFiles.length}>
          <canvas id="pdf-canvas" width={width} height={height}></canvas>
          <div id="pdf-meta">
            <div id="page-count-container">
              Rendering page {currentPage} of {totalPages}
            </div>
          </div>
          {image && (
            <img 
              alt="AI render"
              id="img-canvas" 
              src={image}
              style={{ width: 0, height: 0 }}
              ref={imgElement}
              onLoad={() => { getMainColor(imgElement.current)  } }
            />
          )}
        </div>
      </div>
      { error && <span className="main-error">{error}</span> }
      { percent ? (
        <div className="loader-out">
          <div className="loader-inner" style={{ width: percent+'%' }} />
        </div>
      ) : <></> }
    </div>
  );
}

export default PdfToImages;