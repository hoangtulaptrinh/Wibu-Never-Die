import styled from "styled-components";

import Kabaneri_1366 from "../../../asses/image/Kabaneri_1366.png";
import Kabaneri_1920 from "../../../asses/image/Kabaneri_1920.png";

const Kabaneri = window.screen.width === 1920 ? Kabaneri_1920 : Kabaneri_1366;

const ListMangaWrapper = styled.div`
  .list-manga {
    display: flex;
    height: 100vh;
    width: 85vw;
    overflow-x: hidden;
    .background-image-blur {
      position: absolute;
      height: 100vh;
      width: 85vw;
      // background: url(${Kabaneri});
      filter: blur(5px);
      -webkit-filter: blur(5px);
    }
    .main-content {
      overflow-y: scroll;
      overflow-x: hidden;
      height: 100vh;
      width: 85vw;
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

export default ListMangaWrapper;
