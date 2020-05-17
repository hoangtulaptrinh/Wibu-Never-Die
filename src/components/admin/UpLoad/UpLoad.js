import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import * as actions from "../../../actions/index";

const UpLoad = ({ createNewManga }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const formik = useFormik({
    initialValues: { cover: null, name: "", so_tap: "", title: "" },
    validationSchema: Yup.object({
      cover: Yup.mixed().required("hãy thêm bìa truyện"),
      name: Yup.string().required("hãy nhập tên truyện"),
      so_tap: Yup.string().required("hãy nhập số truyện"),
      title: Yup.string().required("hãy nhập nội dung truyện"),
    }),
    onSubmit: (values) => {
      createNewManga(values);
      toggle();
    },
  });

  return (
    <div>
      <div>
        <Button color="success" onClick={toggle}>
          UpLoad
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader toggle={toggle}>Tạo Mới Truyện</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="exampleSelectMulti">Select Multiple</Label>
                <Input
                  type="file"
                  name="cover"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cover}
                />
                {formik.touched.cover && formik.errors.cover ? (
                  <div style={{ color: "red" }}>{formik.errors.cover}</div>
                ) : null}
              </FormGroup>
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
                <Label for="exampleEmail">Số Tập</Label>
                <Input
                  type="text"
                  name="so_tap"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.so_tap}
                  placeholder="Truyện Của Bạn Có Bao Nhiêu Tập"
                />
                {formik.touched.so_tap && formik.errors.so_tap ? (
                  <div style={{ color: "red" }}>{formik.errors.so_tap}</div>
                ) : null}
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
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    createNewManga: (data) => {
      dispatch(actions.createNewManga(data));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(UpLoad);
