import styled from "styled-components";

export default function Page({ children }) {
  return <PageTag>{children}</PageTag>;
}

const PageTag = styled.div`
  /* робимо фон градієнтом */
  background: linear-gradient(62.93deg, #00425a 19.68%, #1f8a70 89.55%);

  /* робимо фон на всю ширину */
  width: 100%;
`;
