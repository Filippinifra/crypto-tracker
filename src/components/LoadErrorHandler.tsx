import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { errorColor, loadingColor } from "utils/colors";
import { Typography } from "components/Typography";
import { ReloadPageButton } from "components/ReloadPageButton";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadErrorHandler: FC<{ data: any; error: any }> = ({ data, error, children }) => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnline(false);
    });
    window.addEventListener("online", () => {
      setOnline(true);
    });
  }, []);

  if (!data && !error) {
    return (
      <Wrapper style={{ backgroundColor: loadingColor, color: "black" }}>
        <Typography variant="body">.. Caricamento ..</Typography>
      </Wrapper>
    );
  }

  if (error || !isOnline) {
    return (
      <Wrapper style={{ backgroundColor: errorColor, color: "white", display: "flex", flexDirection: "column", gap: 30 }}>
        <Typography variant="body">{!isOnline ? "Non sei online, controlla la connessione!" : "Errore! Ricaricare la pagina."}</Typography>
        <ReloadPageButton />
      </Wrapper>
    );
  }

  return <>{children}</>;
};
