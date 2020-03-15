import styled from "styled-components";

const ReadMangaWrapper = styled.div`
  .read-manga {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: scroll;
    background: black;
    .header-read-manga {
      position: fixed;
      height: 6vh;
      width: 60vw;
      align-self: center;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      background: #f6f7f8;
      button.dropdown-toggle.btn.btn-secondary,
      button.dropdown-item {
        width: 350px !important;
      }
      button.dropdown-item {
        text-align: center;
      }
      .chapter {
        margin-right: 15px;
      }
    }
    .body-read-manga {
      height: 94vh;
      width: 80vw;
      background: #f6f7f8;
      align-self: center;
      display: flex;
      flex-direction: column;
    }
    .img-body-read-manga {
      width: 80vw;
    }
  }
  #read-manga-scroll::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.7);
  }

  #read-manga-scroll::-webkit-scrollbar {
    width: 15px;
    background-color: rgba(255, 255, 255, 0.7);
  }

  #read-manga-scroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(195, 194, 194, 0.7);
  }
`;

export default ReadMangaWrapper;
