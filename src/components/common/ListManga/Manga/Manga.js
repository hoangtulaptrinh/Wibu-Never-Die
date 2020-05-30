import React, { useState } from "react";
import { DragSource } from "react-dnd";
import { useFormik } from "formik";
import { useNavigation } from "react-navi";
import axios from "axios";
import * as Yup from "yup";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

import MangaWrapper from "./Manga.style";

const itemSource = {
  beginDrag(props) {
    props.setShowFavoritesList(true);
    return {};
  },
  endDrag(props, monitor, component) {
    props.setShowFavoritesList(false);
    if (!monitor.didDrop()) {
      return;
    }
    return props.addToFavoritesList(props.manga.id);
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

const Manga = (props) => {
  const { manga, showFavoritesList, isAdmin, setScreen, setIDManga } = props;
  const [show, setShow] = useState(false);
  const showInfoManga = () => setShow(true);
  const hideInfoManga = () => setShow(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { isDragging, connectDragSource } = props;
  const opacity = isDragging ? 0 : 1;
  const { navigate } = useNavigation();

  const the_loai = [
    {
      id: 0,
      name: "all",
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

  const [modal1, setModal1] = useState(false);
  const toggle2 = () => setModal1(!modal1);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [the_loai_ht, set_the_loai_ht] = useState("all");
  const [priview, setPriview] = useState(null);
  const toggle3 = () => setDropdownOpen((prevState) => !prevState);

  const formik = useFormik({
    initialValues: { cover: manga.url, name: manga.name, title: manga.title },
    validationSchema: Yup.object({
      cover: Yup.mixed().required("hãy thêm bìa truyện"),
      name: Yup.string().required("hãy nhập tên truyện"),
      title: Yup.string().required("hãy nhập nội dung truyện"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      typeof values.cover !== "string" &&
        formData.append("cover", values.cover);
      formData.append("name", values.name);
      formData.append("title", values.title);
      axios
        .post("/log_in", formData)
        .then((res) => {
          setIDManga(manga.id);
          setScreen();
          toggle2();
        })
        .catch((err) => console.log(err));
    },
  });

  return connectDragSource(
    <div>
      <MangaWrapper>
        <div className="manga">
          <div
            className={`div-img-manga ${isAdmin && "no-transition"}`}
            onMouseEnter={showInfoManga}
            onMouseLeave={hideInfoManga}
          >
            <img
              style={{ opacity }}
              id="mangaTooltip"
              src={manga.url}
              alt="cover-manga"
              width="210"
              height="220"
              onClick={isAdmin ? toggle2 : toggle}
            />
            {!isAdmin && show === true && (
              <div className="info-manga">
                {!showFavoritesList && `${manga.title} (${manga.episodes} Tập)`}
              </div>
            )}
          </div>
        </div>
        <Modal isOpen={modal} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle}>Kabaneri</ModalHeader>
          <ModalBody>
            <Row>
              {[...Array(manga.episodes)]
                .map((_, index) => `Tập ${index + 1}`)
                .map((item, index) => (
                  <Col sm="2" key={index}>
                    <div className="cover-manga">
                      <Button
                        style={{ width: "100px", marginBottom: "20px" }}
                        outline
                        color="success"
                        onClick={() =>
                          navigate(
                            `/Wibu-Never-Die/Read-Manga?id=${
                              manga.id
                            }&&episodes=${index + 1}`
                          )
                        }
                      >
                        {item}
                      </Button>
                    </div>
                  </Col>
                ))}
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Yêu Thích
            </Button>
            <Button color="secondary" onClick={toggle}>
              Xem Truyện Khác
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modal1} toggle={toggle2}>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader toggle={toggle2}>Tạo Mới Truyện</ModalHeader>
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
              {!priview && <img src={manga.url} alt="img-cover" height={150} />}
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
                <Dropdown isOpen={dropdownOpen} toggle={toggle3}>
                  <DropdownToggle caret>
                    {the_loai_ht === "all" && "Chọn Thể Loại"}
                    {the_loai_ht !== "all" && the_loai_ht}
                  </DropdownToggle>
                  <DropdownMenu>
                    {the_loai.map((item, index) => (
                      <DropdownItem onClick={() => set_the_loai_ht(item.name)}>
                        {item.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
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
              <Button color="secondary" onClick={toggle2}>
                Đợi Một Chút
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </MangaWrapper>
    </div>
  );
};

export default DragSource("item", itemSource, collect)(Manga);
