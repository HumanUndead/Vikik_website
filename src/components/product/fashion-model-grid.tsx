import { FC } from "react";
import FashionModel from "./fashion-model";

interface FashionModelGridProps {
  models: Array<{
    id: string;
    imageUrl: string;
    name: string;
    description?: string;
    category?: string;
    price?: string;
  }>;
}

const FashionModelGrid: FC<FashionModelGridProps> = ({ models }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {models.map((model) => (
        <FashionModel
          key={model?.id}
          imageUrl={model?.imageUrl}
          name={model?.name}
          description={model?.description}
          category={model?.category}
          price={model?.price}
        />
      ))}
    </div>
  );
};

export default FashionModelGrid;
