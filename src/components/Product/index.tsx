import Image from "next/image";
import React from "react";
import Link from "next/link";

import { ProductContainer } from "./styles";

export interface ProductProps {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

export const Product: React.FC<ProductProps> = ({
  id,
  imageUrl,
  name,
  price,
}) => {
  return (
    <Link
      href={`/product/${id}`}
      className="keen-slider__slide"
      prefetch={false}
    >
      <ProductContainer>
        <Image
          loader={() => imageUrl}
          unoptimized
          src={imageUrl}
          alt=""
          width={520}
          height={520}
        />

        {name && (
          <footer>
            <strong>{name}</strong>

            <span>{price}</span>
          </footer>
        )}
      </ProductContainer>
    </Link>
  );
};
