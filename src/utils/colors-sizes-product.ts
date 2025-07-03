import { Product } from "src/api/type";

function ColorsAndSizesProduct(data: Product[]) {
  const colorMap = new Map();
  console.log(colorMap);
  data?.forEach((item) => {
    const colorId = item?.Color?.ID;
    if (!colorMap.has(colorId)) {
      colorMap.set(colorId, {
        color: item,
        sizes: [item],
      });
    } else {
      colorMap.get(colorId).sizes.push(item);
    }
  });

  return colorMap;
}

export default ColorsAndSizesProduct;
