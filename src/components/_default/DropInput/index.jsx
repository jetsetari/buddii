import React, { useEffect, useState } from "react";

import "./DropInput.scss";

const DropInput = ({ placeholder="", items, label, onChange, selected }) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [chosen, setChosen] = useState([]);

    useEffect(() => {
      setChosen(selected ? selected : [])
    }, [selected])

    useEffect(() => {
      onChange(chosen);
    }, [chosen])

    const clickHandle =(value) => {
      let arr_new = [];
      if(chosen && Array.isArray(chosen) ){
        arr_new = chosen;
      }
      console.log(arr_new, value);
      if(arr_new.includes(value)) {
        const index = arr_new.indexOf(value);
        console.log(index);
        arr_new.splice(index, 1);
      } else {
        arr_new.push(value);
      }
      onChange(arr_new);
      setChosen(arr_new);
    }

    const removeClickHandle = (idx) => {
      setChosen(chosen.filter((chose, i) => i !== idx));
    }

    return (
        <div className="labels text">
          { label ? (<label>{ label }</label>) : <></> }
          {
            items.map((item, idx) => {
              return <span className={`item ${ chosen.includes(item.id) ? 'selected': '' }`} key={idx} style={{color: chosen.includes(item.id) ? '#000000': item.color, backgroundColor: chosen.includes(item.id) ? item.color: item.color+'66', opacity: (chosen.includes(item.id) ? 1: 0.85) }} onClick={() => {clickHandle(item.id)}}>{item?.name}</span>
            })
          }
        </div>
    );
}

export default DropInput;