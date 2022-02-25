import { useRouter } from "next/router";
import styled from "styled-components";
import { shadowStyle } from "./style";
import { Typography } from "./Typography";

const ButtonStyled = styled.div`
  width: fit-content;
  border: 1px solid grey;
  padding: 3px 6px;
  ${shadowStyle}
  font-size: 14px;
  cursor: pointer;
`;

export const Button = ({ children, ...others }) => {
  return <ButtonStyled {...others}>{children}</ButtonStyled>;
};

export const RefreshButton = () => {
  const { reload } = useRouter();

  const refreshData = () => {
    reload();
  };

  return (
    <Button onClick={refreshData}>
      <Typography variant="body">Ricarica</Typography>
    </Button>
  );
};
