//libs
import { useCallback, useState } from 'react';

//styling
import './SlideForm.scss';

//assets
import Del from "../../../assets/images/icons/x.svg";
import Dropdown2 from "../../_default/DropDown2";
import DragDropInput from '../../_default/DragDropInput/DragDropInput';
import Slideshow from '../../../backend/models/slideshow';
import { useStores } from '../../../backend/hooks/useStores';

function SlideForm({ closeForm }) {

  const {uiStore, slideshowStore} = useStores();

  const [addPdf, setAddPdf] = useState(true)
  const [choose, setChoose] = useState(false)
  const [AddComp, setAddComp] = useState(false)
  // const [countryfilter, setCountryfilter] = useState('')

  const [image, setImage] = useState({})
  const [PDF, setPDF] = useState({})
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [privateFile, setPrivateFile] = useState(false)

  const handelNext = (num) => {
    setAddPdf(false)
    setChoose(true)
  }

  const handelAddComp = () => {
    setChoose(false)
    setAddComp(true)
  }

  const onDropImage = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage(
         file,
        );
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const onDropPDF = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setPDF(file);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();



    let PDFref = await slideshowStore.uploadSlideshow(PDF, name.replace(/\s/g, ''), uiStore.currentCompany.id);
    let Imgref = await slideshowStore.uploadSlideshowThumb(image, name.replace(/\s/g, ''), uiStore.currentCompany.id);


    const slideshow = new Slideshow({
      ownerId: uiStore.currentUser.id,
      name: name,
      image: Imgref,
      companyId: uiStore.currentCompany.id,
      locked: privateFile,
      description: description,
      file: PDFref
    });
    

    await slideshowStore.createSlideshow(slideshow);
  }

  const optionsCountry = [
    {
      label: "Google",
      value: "Google"
    },
    {
      label: "Netflix",
      value: "Netflix"
    },
    {
      label: "Facebook",
      value: "Facebook"
    },
    {
      label: "Amazon",
      value: "Amazon"
    },
    {
      label: "Apple",
      value: "Apple"
    },
    {
      label: "Microsoft",
      value: "Microsoft"
    },
    {
      label: "Zoho",
      value: "Zoho"
    },
    {
      label: "Youtube",
      value: "Youtube"
    },
    {
      label: "Coca cola",
      value: "Coca cola"
    },
    {
      label: "Deleize",
      value: "Deleize"
    },
    {
      label: "Buddii",
      value: "Buddii"
    },
    {
      label: "VS code",
      value: "VS code"
    }
  ]

  return (
    <article className='slideform_container'>
      <div className='slideform_content'>
        {addPdf &&
          <div className='slideform_content'>
            <div className='slideform_header'>
              <h1 className='slideform_header_title'>Add pdf</h1>
              <div className='slideform_header_close' onClick={() => closeForm(false)}>
                <img src={Del} alt="del icon" />
              </div>
            </div>

            <label className='slideform_label'>
              <p className='slideform_label_name'>Name</p>
              <input onChange={(e) => setName(e.target.value)} className='slideform_input_big' type="text" placeholder='give the pdf a name' />
            </label>


            <label className='slideform_label'>
              <p className='slideform_label_name'>Description</p>
              <input onChange={(e) => setDescription(e.target.value)} className='slideform_input_big' type="text" placeholder='give the pdf a name' />
            </label>


            <label className='slideform_label'>
              <p className='slideform_label_name'>Access</p>
              <input onChange={(e) => setPrivateFile(e.target.value)} className='slideform_input_big' type="text" placeholder='give the pdf a name' />
            </label>

            <div className='slideform_uploads'>
              <DragDropInput onDrop={onDropImage} accept={{'image/jpeg': ['.jpeg', '.png']}}/>
              <DragDropInput onDrop={onDropPDF} accept={{'text/pdf': ['.pdf']}}/>
            </div>


            <div className='slideform_button_next' onClick={e => onSubmit(e)}>
              <p>Next</p>
            </div>
          </div>
        }

        {choose &&
          <div>
            <div className='slideform_header'>
              <h1 className='slideform_header_title'>Choose company</h1>
              <div className='slideform_header_close' onClick={() => closeForm(false)}>
                <img src={Del} alt="del icon" />
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <Dropdown2 options={optionsCountry} 
              // onChange={(e) => setCountryfilter(e)} 
              placeholder="Select a company" />
            </div>

            <div className='slideform_buttons'>
              <div className='slideform_button_add' onClick={() => handelAddComp()}>
                <p>Add New Company</p>
              </div>

              <div className='slideform_button_next' onClick={() => closeForm(false)}>
                <p>Submit</p>
              </div>
            </div>
          </div>
        }

        {AddComp &&
          <div>
            <div className='slideform_header'>
              <h1 className='slideform_header_title'>Add Company</h1>
              <div className='slideform_header_close' onClick={() => closeForm(false)}>
                <img src={Del} alt="del icon" />
              </div>
            </div>

            <label className='slideform_label'>
              <p className='slideform_label_name'>Client Details</p>
              <input className='slideform_input_big' type="text" placeholder='Name' />
            </label>

            <label className='slideform_label'>
              <p className='slideform_label_name'>Tags</p>
              <input className='slideform_input_big' type="text" placeholder='Tag' />
            </label>

            <label className='slideform_label'>
              <p className='slideform_label_name'>Main Contact</p>
              <div className='slideform_grid'>
                <input className='slideform_grid_input' type="text" placeholder='First Name' />
                <input className='slideform_grid_input' type="text" placeholder='Last Name' />
                <input className='slideform_grid_input' type="text" placeholder='Mobile' />
                <input className='slideform_grid_input' type="text" placeholder='Email' />
              </div>
            </label>

            <label className='slideform_label'>
              <p className='slideform_label_name'>VAT</p>
              <input className='slideform_input_big' type="text" placeholder='VAT Number' />
            </label>

            <div className='slideform_button_next' onClick={() => closeForm(false)}>
              <p>Submit</p>
            </div>
          </div>
        }
      </div>
    </article>
  );
}

export default SlideForm;
