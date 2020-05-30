import React, { useState } from "react";
import NewManga from "./NewManga/NewManga";
import Upload from "./Upload/Upload";

const Admin = () => {
  const [isUpload, setIsUpload] = useState(false);

  return (
    <>
      <div style={isUpload ? { display: "none" } : {}}>
        <NewManga setIsUpload={setIsUpload} />
      </div>
      <div style={!isUpload ? { display: "none" } : {}}>
        <Upload />
      </div>
    </>
  );
};

export default Admin;
