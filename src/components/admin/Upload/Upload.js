import React, { useState } from "react";
import { Button, Input, Label } from "reactstrap";
import axios from "axios";

import UploadWrapper from "./Upload.style";

const Upload = () => {
  const [chapter, setChapter] = useState(1);
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
      <div className="total-input">
        <input
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={priviewImg}
        />
        <Label>Tập</Label>
        <Input value={chapter} onChange={(e) => setChapter(e.target.value)} />
      </div>

      {!!priview && (
        <>
          <Button onClick={handleSubmit} color="success">
            Upload Image
          </Button>
          <div className="div-total-img">
            {priview.map((img, index) => (
              <img src={img} alt="img" key={index} />
            ))}
          </div>
          <Button onClick={handleSubmit} color="success">
            Upload Image
          </Button>
        </>
      )}
    </UploadWrapper>
  );
};

export default Upload;
