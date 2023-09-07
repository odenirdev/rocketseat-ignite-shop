import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { DiscordLogo, InstagramLogo, TwitterLogo } from "phosphor-react";

import { globalStyles } from "@/styles/global";

import logoPng from "@/assets/logo.png";
import openSeaSvg from "@/assets/openSea.svg";

import { Container, Footer, Header } from "@/styles/pages/app";
import Image from "next/image";

globalStyles();

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Container>
      <Header>
        <section>
          <h1>
            <Image src={logoPng} alt="" />
          </h1>
        </section>
      </Header>

      <Component {...pageProps} />

      <Footer>
        <p>©2023 - Ignite Shop. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default MyApp;
