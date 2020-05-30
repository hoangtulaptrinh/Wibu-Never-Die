import styled from "styled-components";

const EditMangaWrapper = styled.div`
  .list-manga {
    display: flex;
    .background-image-blur {
      position: absolute;
      height: 100vh;

      filter: blur(5px);
      -webkit-filter: blur(5px);
    }
    .main-content {
      z-index: 1;
      .cover-manga {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50vh;
      }
    }
  }
  #main-content-scroll::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.7);
  }

  #main-content-scroll::-webkit-scrollbar {
    width: 10px;
    background-color: rgba(255, 255, 255, 0.7);
  }

  #main-content-scroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(195, 194, 194, 0.7);
  }
`;

export default EditMangaWrapper;
