import { useState } from "react";
import { server } from '../config/index';

export default function ImageUploader(props){
    const [ image, setImage] = useState(props.image);
    const [ createObjectURL, setCreateObjectURL] = useState(null);
  
    const uploadToClient = (event) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
      }
    };
  
    const uploadToServer = async (event) => {
      const body = new FormData();
      body.append("file", image);
      const response = await fetch("/api/file", {
        method: "POST",
        body
      });
      const res = await response.json()
      setImage(res.pathname)
      props.onSetImage(res.pathname)
    };

    return (
        <imageuploader>
            <div style={{border:"1px solid black",padding:"10px"}}>
                <img src={createObjectURL !== null ? createObjectURL : server + "/" + image} />
                <h4>Select Image</h4>
                <input type="file" name="myImage" onChange={uploadToClient} />
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={uploadToServer}
                    >
                    Send to server
                </button>
            </div>
        </imageuploader>
    )
}

