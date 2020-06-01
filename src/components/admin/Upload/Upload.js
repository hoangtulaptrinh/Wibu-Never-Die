import React, { useState, useEffect } from "react";
import { Button, Input, Label } from "reactstrap";
import { connect } from "react-redux";
import { useNavigation } from "react-navi";
import axios from "axios";
import isEmpty from "lodash/isEmpty";

import UploadWrapper from "./Upload.style";
import { baseHost } from "../../../actions";
import { toastSuccess } from "../../../Helper/ToastHelper";

const Upload = ({ idManga, newIDManga, setIDManga }) => {
  const { navigate } = useNavigation();
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

  const currentUser1 = localStorage.currentUser;
  const token =
    !!currentUser1 &&
    !isEmpty(JSON.parse(currentUser1)) &&
    JSON.parse(currentUser1).token;

  var config = {
    headers: { Authorization: "Bearer " + token },
  };

  const handleSubmit = () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`files[]`, files[i]);
    }
    formData.append("number", chapter);
    axios
      .post(`${baseHost}/mangas/${idManga}/chapters`, formData, config)
      .then((res) =>
        toastSuccess(`Upload Truyện Cho Tập ${chapter} Thành Công`)
      )
      .catch((err) => console.log(err));
  };
  console.log(newIDManga);
  useEffect(() => {
    !!newIDManga && setIDManga(newIDManga);
  }, [newIDManga, setIDManga]);
  return (
    <UploadWrapper>
      <div className="total-input">
        <input
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={priviewImg}
        />
        <Button
          color="info"
          style={{ marginRight: "50px" }}
          onClick={() => navigate("/Wibu-Never-Die")}
        >
          Home
        </Button>
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

const mapStatetoProps = (state) => {
  return {
    newIDManga: state.newIDManga,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchToProps)(Upload);
