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
    .search-type-favorites {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      svg {
        margin-top: 5px;
      }
  }
    }
  }
  /* Switch starts here */
  .rocker {
    display: inline-block;
    position: relative;
    /*
    SIZE OF SWITCH
    ==============
    All sizes are in em - therefore
    changing the font-size here
    will change the size of the switch.
    See .rocker-small below as example.
    */
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    color: #888;
    width: 7em;
    height: 4em;
    overflow: hidden;
    border-bottom: 0.5em solid #eee;
  }

  .rocker-small {
    font-size: 14px; /* Sizes the switch */
    margin: 0;
  }

  .rocker::before {
    content: "";
    position: absolute;
    top: 0.5em;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    border: 0.5em solid #eee;
    border-bottom: 0;
  }

  .rocker input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .switch-left,
  .switch-right {
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5em;
    width: 3em;
    transition: 0.2s;
  }

  .switch-left {
    height: 2.4em;
    width: 2.75em;
    left: 0.85em;
    bottom: 0.4em;
    background-color: #ddd;
    transform: rotate(15deg) skewX(15deg);
  }

  .switch-right {
    right: 0.5em;
    bottom: 0;
    background-color: #bd5757;
    color: #fff;
  }

  .switch-left::before,
  .switch-right::before {
    content: "";
    position: absolute;
    width: 0.4em;
    height: 2.45em;
    bottom: -0.45em;
    background-color: #ccc;
    transform: skewY(-65deg);
  }

  .switch-left::before {
    left: -0.4em;
  }

  .switch-right::before {
    right: -0.375em;
    background-color: transparent;
    transform: skewY(65deg);
  }

  input:checked + .switch-left {
    background-color: #0084d0;
    color: #fff;
    bottom: 0px;
    left: 0.5em;
    height: 2.5em;
    width: 3em;
    transform: rotate(0deg) skewX(0deg);
  }

  input:checked + .switch-left::before {
    background-color: transparent;
    width: 3.0833em;
  }

  input:checked + .switch-left + .switch-right {
    background-color: #ddd;
    color: #888;
    bottom: 0.4em;
    right: 0.8em;
    height: 2.4em;
    width: 2.75em;
    transform: rotate(-15deg) skewX(-15deg);
  }

  input:checked + .switch-left + .switch-right::before {
    background-color: #ccc;
  }

  /* Keyboard Users */
  input:focus + .switch-left {
    color: #333;
  }

  input:checked:focus + .switch-left {
    color: #fff;
  }

  input:focus + .switch-left + .switch-right {
    color: #fff;
  }

  input:checked:focus + .switch-left + .switch-right {
    color: #333;
  }
`;

export default LeftSideBarWrapper;
