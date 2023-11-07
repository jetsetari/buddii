import React from "react";

import "./TagsInput.scss";

function TagsInput({ tags, onChange, placeholder="Start typing...", label }) {

    function handleKeyDown(e){
        // If user did not press enter key, return
        if(e.key !== 'Enter') return
        // Get the value of the input
        const value = e.target.value
        // If the value is empty, return
        if(!value.trim()) return
        // Add the value to the tags array
        onChange([...tags, value])
        // Clear the input
        e.target.value = ''
    }

    function removeTag(index){
        onChange(tags.filter((el, i) => i !== index))
    }

    return (
        <>
            
            <div className="tags-input-container">
                { tags.map((tag, index) => (
                    <div className="tag-item" key={index}>
                        <span className="text">{tag}</span>
                        <span className="close" onClick={() => removeTag(index)}>&times;</span>
                    </div>
                )) }
            </div>
            <label className="label">{label}</label>
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type somthing" />


        </>
    );
}

export default TagsInput;
