import Stripe from "stripe";
import { GetServerSideProps, GetStaticProps } from "next";
import React from "react";
import Head from "next/head";
import { useKeenSlider } from "keen-slider/react";

import { Product } from "@/components/Product";

import { HomeContainer } from "@/styles/pages/home";

import "keen-slider/keen-slider.min.css";
import { stripe } from "@/lib/stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

const Home = ({ products }: HomeProps) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },

    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 48,
        },
      },

      "(max-width: 320px)": {
        slides: {
          perView: 1,
          spacing: 48,
        },
      },
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <div className="keen-slider__slide" key={product.id}>
            <Product {...product} />
          </div>
        ))}
      </HomeContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format((price.unit_amount as number) / 100),
    };
  });

  return {
    props: { products },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};

export default Home;
