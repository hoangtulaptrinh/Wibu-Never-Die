import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation } from "react-navi";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import * as actions from "../../../actions/index";

const NewManga = ({ createNewManga, setScreen, statusCreateNewManga }) => {
  const { navigate } = useNavigation();

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [priview, setPriview] = useState(null);
  const toggle1 = () => setDropdownOpen((prevState) => !prevState);

  const formik = useFormik({
    initialValues: { cover: null, name: "", category: "", title: "" },
    validationSchema: Yup.object({
      cover: Yup.mixed().required("hãy thêm bìa truyện"),
      name: Yup.string().required("hãy nhập tên truyện"),
      category: Yup.string().required("hãy chọn thể loại"),
      title: Yup.string().required("hãy nhập nội dung truyện"),
    }),
    onSubmit: (values) => {
      createNewManga(values);
      toggle();
    },
  });

  const the_loai = [
    {
      id: 0,
      name: "",
      amount: 30,
    },
    {
      id: 1,
      name: "horror",
      amount: 3,
    },
    {
      id: 2,
      name: "detective",
      amount: 4,
    },
    {
      id: 3,
      name: "action",
      amount: 4,
    },
    {
      id: 4,
      name: "adult",
      amount: 4,
    },
    {
      id: 5,
      name: "chanbara",
      amount: 4,
    },
    {
      id: 6,
      name: "comedy",
      amount: 4,
    },
    {
      id: 7,
      name: "parody",
      amount: 4,
    },
    {
      id: 8,
      name: "doujinshi",
      amount: 4,
    },
    {
      id: 9,
      name: "drama",
      amount: 4,
    },
    {
      id: 10,
      name: "ecchi",
      amount: 4,
    },
    {
      id: 11,
      name: "fantasy",
      amount: 4,
    },
    {
      id: 12,
      name: "gekiga",
      amount: 4,
    },
    {
      id: 13,
      name: "harem",
      amount: 4,
    },
    {
      id: 14,
      name: "mature",
      amount: 4,
    },
    {
      id: 15,
      name: "omake",
      amount: 4,
    },
  ];

  useEffect(() => {
    statusCreateNewManga && setScreen("upload");
  }, [setScreen, statusCreateNewManga]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: 800,
          }}
        >
          <Button color="success" onClick={toggle}>
            NewManga
          </Button>
          <Button color="info" onClick={() => navigate("/Wibu-Never-Die")}>
            Home
          </Button>
          <Button color="primary" onClick={() => setScreen("edit")}>
            EditManga
          </Button>
        </div>
        <Modal isOpen={modal} toggle={toggle}>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader toggle={toggle}>Tạo Mới Truyện</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="exampleSelectMulti">Select Multiple</Label>
                <Input
                  type="file"
                  name="cover"
                  onChange={(event) => {
                    formik.setFieldValue("cover", event.target.files[0]);
                    setPriview(URL.createObjectURL(event.target.files[0]));
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.cover && !priview ? (
                  <div style={{ color: "red" }}>{formik.errors.cover}</div>
                ) : null}
              </FormGroup>
              {!!formik.touched.cover && !!priview && (
                <img src={priview} alt="img-cover" height={150} />
              )}
              <FormGroup>
                <Label for="exampleEmail">Tên Truyện</Label>
                <Input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="Tên Truyện Của Bạn Là Gì"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div style={{ color: "red" }}>{formik.errors.name}</div>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Dropdown isOpen={dropdownOpen} toggle={toggle1}>
                  <DropdownToggle caret>
                    {!formik.values.category && "Chọn Thể Loại"}
                    {!!formik.values.category && formik.values.category}
                  </DropdownToggle>
                  <DropdownMenu>
                    {the_loai.map((item, index) => (
                      <DropdownItem
                        onClick={() =>
                          formik.setFieldValue("category", item.name)
                        }
                        key={index}
                      >
                        {item.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                  {formik.touched.category && formik.errors.category ? (
                    <div style={{ color: "red" }}>{formik.errors.category}</div>
                  ) : null}
                </Dropdown>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Giới Thiệu Về Truyện</Label>
                <Input
                  type="textarea"
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  placeholder="Nói Qua Về Nội Dung Bộ Truyện Của Bạn"
                />
                {formik.touched.title && formik.errors.title ? (
                  <div style={{ color: "red" }}>{formik.errors.title}</div>
                ) : null}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                Tiếp Tục
              </Button>
              <Button color="secondary" onClick={toggle}>
                Đợi Một Chút
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    statusCreateNewManga: state.statusCreateNewManga,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createNewManga: (data) => {
      dispatch(actions.createNewManga(data));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(NewManga);
