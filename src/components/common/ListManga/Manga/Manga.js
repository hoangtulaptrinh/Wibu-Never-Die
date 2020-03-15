import React, { useState } from "react";
import { useNavigation } from "react-navi";
import { DragSource } from "react-dnd";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
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
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

const Manga = props => {
  const { manga, showFavoritesList } = props;
  const [show, setShow] = useState(false);
  const showInfoManga = () => setShow(true);
  const hideInfoManga = () => setShow(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { isDragging, connectDragSource } = props;
  const opacity = isDragging ? 0 : 1;
  const { navigate } = useNavigation();
  return connectDragSource(
    <div>
      <MangaWrapper>
        <div className="manga">
          <div
            className="div-img-manga"
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
              onClick={toggle}
            />
            {show === true && (
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
                        onClick={() => navigate("/Wibu-Never-Die/Read-Manga")}
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
      </MangaWrapper>
    </div>
  );
};

export default DragSource("item", itemSource, collect)(Manga);
