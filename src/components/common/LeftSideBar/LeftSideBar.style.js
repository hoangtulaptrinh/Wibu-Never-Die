import styled from "styled-components";

const LeftSideBarWrapper = styled.div`
  .left-side-bar {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 15vw;
    background-color: #edffea;
    input {
      width: 450px;
      padding: 5px;
      margin: 15px;
      height: 25px;
      outline: none;
    }

    .search-circle {
      border: 4px inside #080;
      border-color: #439bc6;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      box-shadow: 3px 2px 2px rgba(21, 153, 219, 0.5);
      transition: all 1s ease;
      float: left;
      color: gray;
    }

    .search-circle:hover,
    .search-circle:focus {
      width: 70%;
      border-radius: 3%;
    }

    .search-bar {
      position: relative;
      float: left;
      border-left: 3px solid #000;
      border-right: 2px solid #ddd;
      height: 45px;
      background: #ddd;
      left: 0.5%;
      top: 65px;
      transform: rotate(-45deg);
      box-shadow: 0 1px 2px 1px rgba(239, 33, 85, 0.5);
    }
    .list-category {
      margin-top: 30px;
      height: 65vh;
      overflow-y: scroll;
      border-bottom: 1px solid #d6d6d7;
      .categorySelected {
        background-color: rgba(189, 174, 174, 0.2);
      }
      .category:not(.removeHover):hover {
        background-color: rgba(245, 231, 231, 0.3);
      }
      .removeHover {
        background-color: rgba(189, 174, 174, 0.2);
      }
    }
    .category {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      border-top: 1px solid #d6d6d7;
    }
    .log-in-log-out {
      margin-top: 5px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
    #left-side-bar-scroll::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.7);
    }

    #left-side-bar-scroll::-webkit-scrollbar {
      width: 5px;
      background-color: rgba(255, 255, 255, 0.7);
    }

    #left-side-bar-scroll::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: rgba(195, 194, 194, 0.7);
    }
    .cursor {
      cursor: pointer;
    }
    .e-resize {
      cursor: e-resize;
    }
    .ne-resize {
      cursor: ne-resize;
    }
  }
`;

export default LeftSideBarWrapper;
