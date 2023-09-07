import { styled } from "@stitches/react";

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  gap: "4rem",

  maxWidth: 1180,
  marginInline: "auto",
  paddingInline: "1rem",
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 520,
  height: 520,
  background: "rgba(255, 255, 255, 0.03)",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  h1: {
    fontSize: "$2xl",
    color: "$gray300",
  },

  span: {
    marginTop: "1rem",
    display: "block",
    fontSize: "$2xl",
    color: "$green300",
  },

  p: {
    marginTop: "2.5rem",
    fontSize: "$md",
    lineHeight: 1.6,
    color: "$gray300",
  },

  button: {
    marginTop: "auto",
    backgroundColor: "$green500",
    border: 0,
    borderRadius: 6,

    color: "$white",
    fontWeight: "bold",
    fontSize: "$md",

    padding: "1.25rem",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "$green300",
    },
  },
});
