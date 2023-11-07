//libs

//styling
import "./Dropdown.scss";

//assets
import Dropdown from 'react-dropdown';

function DropDown({options, onChange, value, placeholder, className}) {
  return (
    <div>
      <Dropdown className={`dropdown${className}`} options={options} onChange={onChange} value={value} placeholder={placeholder}/>
    </div>
  );
}

export default DropDown;
