import React from 'react'
import "./index.css"
// import {  ,uploadBytesResumable } from "firebase/storage";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase-config";

export default function ImgUpload() {

    const [progress, setProgress] = React.useState(0);
    const [imageUpload, setImageUpload] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setImageUpload( e.target.files[0]);
        uploadFile();
    }

    // const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + new Date()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            console.log(snapshot.bytesTransferred / snapshot.totalBytes);
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              
              setProgress(prog);
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);
                setImageUrl((prev) => [...prev, url]);
            });
        });
    };

    // React.useEffect(() => {
    //     listAll(imagesListRef).then((response) => {
    //         response.items.forEach((item) => {
    //             getDownloadURL(item).then((url) => {
    //                 setImageUrls((prev) => [...prev, url]);
    //             });
    //         });
    //     });
    // });
    // console.log(imageUrl);
    /* const uploadFiles = (file) => {
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log('snapshot', snapshot);
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
          },
          (error) => console.log('error',error),

          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
            });
          }
        );
      }; */

    return (
        <div className="upload">
            <div className='upload__btn'>
                <input type="file" className='upload_btn_input'
                    name="itemImg" onChange={handleChange} />
            </div>
            <h6 className='upload__progress_bar'>Uploading done {progress}%</h6>
            {
                imageUrl ? <img className='img_show' alt="icon" src={imageUrl}/> : ""
            }
            
        </div>
    )
}
