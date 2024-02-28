import { ListItem } from "../list-item";

const List = ({ items, columnWidths, handleDelete }) => {

  return (
    <div className="flex flex-col gap-4">

      {items.map((item) => (
        <ListItem
          key={item._id}
          item={item}
          columnWidths={columnWidths}
          handleDelete={handleDelete}
        />
      ))}

    </div>
  );
}

export { List };
