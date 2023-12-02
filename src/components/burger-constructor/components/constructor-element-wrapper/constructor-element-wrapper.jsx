import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  deleteConstructorIngredient,
  moveMiddleIngredients,
} from "../../../../services/slices/ingredients.slice";
import { useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import elementWrapper from "./constructor-element-wrapper.module.css";
import { ingredientPropTypes } from "../../../../utils/types";
import PropTypes from "prop-types";

export default function ConstructorElementWrapper({ item, index }) {
  const dispatch = useDispatch();
  function handleDelete(item) {
    dispatch(deleteConstructorIngredient(item.uniqueId));
  }
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveMiddleIngredients({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  const preventDefault = (e) => e.preventDefault();

  return (
    <div
      className={elementWrapper.ingredientRow}
      key={item.uniqueId}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      onDrop={preventDefault}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        index={index}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => handleDelete(item)}
      />
    </div>
  );
}

ConstructorElementWrapper.propTypes = {
  item: PropTypes.shape(ingredientPropTypes).isRequired,
  index: PropTypes.number.isRequired,
};
