import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '@data/firebase';
import { v4 } from "uuid";
import Loading from "@components/_default/Loading";

//styling
import "./UploadFile.scss";

const UploadFile = ({ accept, type, file, uploadPath, fileName, onFinishUpload }) => {

  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(false);
  const [fileImage, setFileImage] = useState(file);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((myFile) => {
      let extension = '.jpg';//'.'+getExtension(myFile.name).toLowerCase();
      let file_name = (fileName && (typeof fileName !== 'undefined')) ? fileName+extension : v4()+extension;
      const storageRef = ref(storage, `${uploadPath}${file_name}`);
      const uploadTask = uploadBytesResumable(storageRef, myFile);
      setLoading(true);
      uploadTask.on("state_changed", (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPercent(percent);
      }, (err) => { console.log(err); }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setLoading(false);
          setTimeout(()=> {
            setFileImage(url);
            onFinishUpload(url);
            // setFileImage(url.replace('.jpg', '_1360x1024.jpg'));
            // onFinishUpload(url.replace('.jpg', '_1360x1024.jpg'));
          }, 1000);
        });
      });
      return myFile;
    });
  }, [fileName, onFinishUpload, uploadPath]);

  useEffect(() => {
    setFileImage(file);
  }, [file])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({accept, onDrop, multiple: false});

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {percent}% - {file.path} {/*- {file.size} bytes*/}
    </li>
  ));

  return (
    <div {...getRootProps({ className: "dropzone upload-file "+(isDragActive ? 'active' : '') })}>
      <input className="input-zone" {...getInputProps()} />
      <div className="input-image" style={{ backgroundImage: `url(${fileImage})` }} >
        { loading ? <Loading position={'absolute'} /> : <></> }
      </div>
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">
            Release to drop the files here
          </p>
        ) : (
          <p className="dropzone-content">
            Drag’n’drop some files here, or click to select files
          </p>
        )}
        <button type="button" multiple={false} className="btn-upload">
          Click to select files
        </button>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}

export default UploadFile;