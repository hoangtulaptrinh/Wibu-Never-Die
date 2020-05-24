import React, { useState } from "react";

const Upload = () => {
  const [priview, setPriview] = useState([]);
  const priviewImg = (event) => {
    // const urlArray = event.target.files.map((file) =>
    //   URL.createObjectURL(file)
    // );
    // setPriview(urlArray);
    console.log(event.target.files);
  };
  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg"
        multiple
        onChange={priviewImg}
      />
      {priview.map((img, index) => (
        <img src={img} alt="img" />
      ))}
    </div>
  );
};

export default Upload;
