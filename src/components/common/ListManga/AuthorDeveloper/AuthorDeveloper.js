import React from "react";

import "./AuthorDeveloper.scss";

import duong from "../../../../asses/image/duong.jpg";
import thang from "../../../../asses/image/thang.jpg";
import trung from "../../../../asses/image/trung.jpg";

const AuthorDeveloper = () => {
  return (
    <div id="item-card">
      <div className="item-border">
        <div className="img-container">
          <img src={duong} alt="" />
        </div>
        <div className="text-container">
          <div className="content">
            <h3>Đỗ Tùng Dương</h3>
            <h4>React JS/Node JS Developer</h4>
          </div>
        </div>
      </div>
      <div className="item-border">
        <div className="img-container">
          <img src={thang} alt="" />
        </div>
        <div className="text-container">
          <div className="content">
            <h3>Trần Xuân Thắng</h3>
            <h4>Vue JS/Ruby On Rails Developer</h4>
          </div>
        </div>
      </div>
      <div className="item-border">
        <div className="img-container">
          <img src={trung} alt="" />
        </div>
        <div className="text-container">
          <div className="content">
            <h3>Nguyễn Sỹ Trung</h3>
            <h4>React JS Developer</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDeveloper;
