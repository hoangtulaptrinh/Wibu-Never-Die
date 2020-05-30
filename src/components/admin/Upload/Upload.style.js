import styled from "styled-components";

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow-y: auto;
  .div-total-img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      max-height: 80vh;
    }
  }
  .total-input {
    width: 500px;
    display: flex;
    align-items: center;
    label {
      margin: 0;
    }
  }
`;

export default UploadWrapper;
