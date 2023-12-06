import React, { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  deleteConstructorIngredient,
  moveMiddleIngredients,
} from "../../../../services/slices/ingredients.slice";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import elementWrapper from "./constructor-element-wrapper.module.css";
import { IngredientType } from "../../../../utils/types";

interface ConstructorElementWrapperProps {
  item: IngredientType;
  index: number;
}

interface DragItem {
  type?: string;
  id: string;
  index: number;
}

const ConstructorElementWrapper: React.FC<ConstructorElementWrapperProps> = ({
  item,
  index,
}) => {
  const dispatch = useDispatch();

  function handleDelete(item: IngredientType) {
    dispatch(deleteConstructorIngredient(item.uniqueId));
  }

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, any, any>({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
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
      const clientOffset: XYCoord | null = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      const hoverClientY: number = clientOffset.y - hoverBoundingRect.top;
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

  const [{ isDragging }, drag] = useDrag<DragItem, any, any>({
    type: "component",
    item: { id: item._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  const preventDefault = (e: React.DragEvent) => e.preventDefault();

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
        // index={index}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => handleDelete(item)}
      />
    </div>
  );
};

export default ConstructorElementWrapper;
