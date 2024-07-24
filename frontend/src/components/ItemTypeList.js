const ItemTypeList = ({ items, title }) => (
  <div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <ul>
      {items.map((itemType, index) => (
        <li key={index} className="mb-2">
          {itemType.type}: {itemType.totalSold}
        </li>
      ))}
    </ul>
  </div>
);

export default ItemTypeList;
