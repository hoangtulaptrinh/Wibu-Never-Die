import styled from "styled-components";

const FavoritesListWrapper = styled.div`
  .FavoritesList {
    position: absolute;
    top: 50%;
    left: 57%;
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`;

export default FavoritesListWrapper;
