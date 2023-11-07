//libs

//styling
import "./Dropdown.scss";

//assets
import Dropdown from 'react-dropdown';

const DropDownMain = ({options, onChange, value, placeholder, label=false}) => {

  return (
    <div>
      { label ? (<label>{ label }</label>) : <></> }
      <Dropdown className='dropdown' options={options} onChange={onChange} value={value} placeholder={placeholder} />
    </div>
  );
}

export default DropDownMain;
