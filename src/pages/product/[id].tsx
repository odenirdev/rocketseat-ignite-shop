import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    priceId: string;
    price: string;
  } | null;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { isFallback } = useRouter();

  async function handleBuyProduct() {
    try {
      console.log(product?.priceId);

      const response = await axios.post("/api/checkout", {
        priceId: product?.priceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      alert("Falha ao redirecionar ao checkout!");
    }
  }

  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{product?.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image
            src={product?.imageUrl || ""}
            loader={() => product?.imageUrl || ""}
            unoptimized
            alt=""
            width={520}
            height={520}
          />
        </ImageContainer>
        <ProductDetails>
          <h1>{product?.name}</h1>

          <span>{product?.price}</span>

          <p>{product?.description}</p>

          <button onClick={handleBuyProduct}>Comprar Agora</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;
  if (productId) {
    const product = await stripe.products.retrieve(productId, {
      expand: ["default_price"],
    });

    const price = product.default_price as Stripe.Price;

    return {
      props: {
        product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          priceId: price.id,
          price: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format((price.unit_amount as number) / 100),
        },
      },
      revalidate: 60 * 60 * 2,
    };
  }

  return {
    props: {
      product: null,
    },
    revalidate: 60 * 60 * 2,
  };
};

export default Product;
