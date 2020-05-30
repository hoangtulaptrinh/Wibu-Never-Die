import React, { useEffect } from "react";
import { DropTarget } from "react-dnd";
import { Heart, Trash2 } from "react-feather";
import { useCurrentRoute } from "react-navi";

import FavoritesListWrapper from "./FavoritesList.style";

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  };
};

const canDropTheTarget = {
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }
    return;
  },
};

const FavoritesList = (props) => {
  const currentRoute = useCurrentRoute().url.pathname;
  const { connectDropTarget, hovered } = props;
  const backgroundColor = hovered ? "" : "";
  useEffect(() => {
    if (hovered) props.setHoverFavoritesList(true);
    else props.setHoverFavoritesList(false);
  }, [hovered, props]);
  return connectDropTarget(
    <div>
      <FavoritesListWrapper>
        <div className="FavoritesList" style={{ background: backgroundColor }}>
          {currentRoute === "/Wibu-Never-Die" && (
            <Heart size="200" color="pink" />
          )}
          {currentRoute === "/Wibu-Never-Die/Favorites-Page" && (
            <Trash2 size="200" color="red" />
          )}
        </div>
      </FavoritesListWrapper>
    </div>
  );
};

export default DropTarget("item", canDropTheTarget, collect)(FavoritesList);
