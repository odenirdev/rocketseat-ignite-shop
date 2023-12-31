import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled("header", {
  padding: "2rem 1rem",
  width: "100%",
  maxWidth: 1180,
  marginInline: "auto",

  img: {
    width: "7rem",
    height: "auto",
    objectFit: "contain",
  },
});

export const Footer = styled("footer", {
  width: "100%",
  maxWidth: 1180,
  marginInline: "auto",
  padding: "2rem 1rem",
});
