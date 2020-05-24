import React, { useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";

import UploadWrapper from "./Upload.style";

const Upload = () => {
  const [priview, setPriview] = useState(null);
  const [files, setFiles] = useState(null);

  const priviewImg = (event) => {
    const objectImg = event.target.files;
    const files = Array.from(objectImg);
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener("load", (ev) => {
            resolve(ev.target.result);
          });
          reader.addEventListener("error", reject);
          reader.readAsDataURL(file);
        });
      })
    ).then(
      (images) => {
        /* Once all promises are resolved, update state with image URI array */
        setPriview(images);
        setFiles(objectImg);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const handleSubmit = () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`images[${i}]`, files[i]);
    }
    axios
      .post("/log_in", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <UploadWrapper>
      <input
        type="file"
        accept="image/png, image/jpeg"
        multiple
        onChange={priviewImg}
      />
      {!!priview && (
        <>
          <Button onClick={handleSubmit} color="success">
            Upload Image
          </Button>
          {priview.map((img, index) => (
            <img src={img} alt="img" key={index} />
          ))}
          <Button onClick={handleSubmit} color="success">
            Upload Image
          </Button>
        </>
      )}
    </UploadWrapper>
  );
};

export default Upload;
