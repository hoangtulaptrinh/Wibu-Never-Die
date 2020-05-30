import styled from "styled-components";

const MangaWrapper = styled.div`
  .manga {
    .div-img-manga {
      img {
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
        transition: all 700ms ease-in-out;
        cursor: pointer;
      }
      img:hover {
        box-shadow: 0 20px 150px rgba(0, 0, 0, 0.1);
        transform: translateY(-80px);
      }
      .info-manga {
        position: absolute;
        margin-top: -80px;
        height: 100px;
        width: 210px;
        color: white;
      }
    }
    .no-transition {
      img:hover {
        transform: none;
      }
    }
  }
`;

export default MangaWrapper;
