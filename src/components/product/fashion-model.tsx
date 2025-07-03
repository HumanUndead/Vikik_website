import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface FashionModelProps {
  imageUrl: string;
  name: string;
  description?: string;
  category?: string;
  price?: string;
}

const FashionModel: React.FC<FashionModelProps> = ({
  imageUrl,
  name,
  description,
  category,
  price,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg bg-white"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-[500px] w-full">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
          unoptimized
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        {category && (
          <span className="inline-block px-3 py-1 text-sm text-white bg-black/50 rounded-full mb-2">
            {category}
          </span>
        )}
        {description && (
          <p className="text-white/90 text-sm mb-2">{description}</p>
        )}
        {price && <p className="text-white font-semibold">{price}</p>}
      </div>
    </motion.div>
  );
};

export default FashionModel;
