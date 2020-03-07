import React from "react";
import { DropTarget } from "react-dnd";
import { Heart } from "react-feather";

import FavoritesListWrapper from "./FavoritesList.style";

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
};

const canDropTheTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }
    return;
  }
};

const FavoritesList = props => {
  const { connectDropTarget, hovered } = props;
  const backgroundColor = hovered ? "lightgreen" : "";

  return connectDropTarget(
    <div>
      <FavoritesListWrapper>
        <div className="FavoritesList" style={{ background: backgroundColor }}>
          <Heart size="200" color="pink" />
        </div>
      </FavoritesListWrapper>
    </div>
  );
};

export default DropTarget("item", canDropTheTarget, collect)(FavoritesList);
