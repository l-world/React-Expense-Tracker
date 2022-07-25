import React from 'react'
import "./index.css"


export default function ImgUpload(props) {

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.files[0]){
            props.uploadFile && props.uploadFile(e.target.files[0]);
        }
    }

    return (
        <div className="upload">
            <div className='upload__btn'>
                <input type="file" accept="image/*" onChange={handleChange} className='upload_btn_input' />
            </div>
            <h6 className='upload__progress_bar'>Uploading done {props.progress}%</h6>
            {
                props.imageUrl ? <img className='img_show' alt="icon" src={props.imageUrl} />: ""
            }
        </div>
    )
}
