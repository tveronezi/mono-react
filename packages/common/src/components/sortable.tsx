import { type ReactNode, useCallback, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface DraggableItemProps {
  component: ReactNode;
  id: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableItem({ component, id, index, moveItem }: DraggableItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "COMPONENT",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "COMPONENT",
    hover: (item: { id: string; index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {component}
    </div>
  );
}

export function Sortable(props: {
  components: {
    component: ReactNode;
    id: string;
  }[];
}) {
  const [items, setItems] = useState(props.components);

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const [removed] = newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, removed);
      return newItems;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-full flex-col gap-1">
        {items.map((c, index) => (
          <DraggableItem
            key={c.id}
            id={c.id}
            index={index}
            component={c.component}
            moveItem={moveItem}
          />
        ))}
      </div>
    </DndProvider>
  );
}
