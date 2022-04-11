import { Button } from "components/Button";
import { Spacer } from "components/Spacer";
import { Typography } from "components/Typography";
import { useResponsive } from "hooks/useResponsive";
import Image from "next/image";
import { useClientRouter } from "hooks/useClientRouter";
import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { homePath, registrationPath } from "utils/paths";
import { logEvent } from "firebase/analytics";
import { analytics } from "utils/firebase";
import { useTranslation } from "react-i18next";


const Wrapper = styled.div`
  max-width: 700px;
  margin: 0px auto;
`;

const BoldLabel: FC = ({ children }) => (
  <Typography variant="body" component="span" style={{ fontWeight: 600 }}>
    {children}
  </Typography>
);

const ScreenImage: FC<{ src: string; style?: React.CSSProperties; width?: number }> = ({ src, style, width }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: width || "100%", alignItems: "center", ...style }}>
      <Typography variant="body2">Screenshot</Typography>
      <div style={{ border: "1px dotted red" }}>
        <Image src={src} alt="" />
      </div>
    </div>
  );
};

export default function InfoPage() {
  const { getResponsiveValue } = useResponsive();
  const router = useClientRouter();
  const { t } = useTranslation();
  const InfoTypography: FC = ({children}) => <Typography variant={"body"}style={{whiteSpace: "pre-line"}}>{children}</Typography>
  
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "info_page_visited");
    }
  }, []);

  return (
    <Wrapper style={{ padding: getResponsiveValue(["20px 30px", "40px 40px", "60px 50px"]) }}>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Typography variant="title">{t("info.title1")}</Typography>
      </div>
      <Spacer size={30} />
      <Typography variant="body">{t("info.aboutProject")}</Typography>
      <Spacer size={30} />
      <Typography variant="body">{t("info.aboutUs")}</Typography>
      <Spacer size={30} />
      <Typography variant="body">
      {t("info.ourVision")}{" "}
        <BoldLabel>{t("info.ourVisionBold")}</BoldLabel>
      </Typography>
      <Spacer size={30} />
      <Typography variant="body">
      {t("info.aboutRebalancing")}{" "}
        <BoldLabel>
          <a href="https://thecryptogateway.it/investimento-cosa-vuol-dire-ribilanciamento-del-portafoglio/" rel="noreferrer" target={"_blank"} style={{ color: "black" }}>
          {t("info.hereRef")}
          </a>
        </BoldLabel>{" "}
        {t("info.linkDescription")}
      </Typography>
      <Spacer size={30} />
      <Typography variant="body">
      {t("info.toolDescription")}
        <br />
        <br />{t("info.functionality1")}
        <br />
        <br />{t("info.functionality2")}
        <br />
        <br />{t("info.functionality3")}
      </Typography>
      <Spacer size={30} />
      <Typography variant="body">
      {t("info.applicationInfo")}
        <br />
        <br />{t("info.info1")}
        <br />
        <br />{t("info.info2")}
        <br />
        <br />{t("info.info3")}
        <br />
        <br />{t("info.info4")}
        <br />
        <br />{t("info.info5")}
      </Typography>
      <Spacer size={30} />
      <Typography variant="body">
      {t("info.helpFeedback")}{" "}
        <BoldLabel>
          <a href="mailto:master.gunner96@yahoo.com" style={{ color: "black" }}>
          {t("info.helpMail")}
          </a>
        </BoldLabel>
      </Typography>
      <Spacer size={30} />
      <div style={{ width: "100%", textAlign: "center" }}>
        <Typography variant="title">{t("info.title2")}</Typography>
      </div>
      <Spacer size={30} />
      <InfoTypography>{t("info.introTutorial")}{" "}</InfoTypography>
        <Typography variant="body">
        <BoldLabel>
          <a href="https://thecryptogateway.it/costruzione-del-portafoglio-di-investimento/" rel="noreferrer" target={"_blank"} style={{ color: "black" }}>
            questo articolo
          </a>
        </BoldLabel>{" "}
        (The Crypto Gateway).
      </Typography>
      <Spacer size={30} />
      <Typography variant="body">
        Clicca{" "}
        <BoldLabel>
          <a href={registrationPath} target={"_blank"} rel="noreferrer" style={{ color: "black" }}>
            qui
          </a>
        </BoldLabel>{" "}
        per andare alla pagina di registrazione, oppure se sei sulla pagina di accesso cerca il bottone per registrarti.
      </Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/registration-screen.png")} />
      <Spacer size={30} />
      <Typography variant="body">Inserisci ora la tua email e una password, segui i messaggi di errore rossi per creare una password efficace.</Typography>
      <Spacer size={30} />
      <Typography variant="body">
        Una volta che avrai inserito i dati corretti e avrai confermato ti arriverà una mail con un link per confermare la tua email. Clicca sul link e torna alla piattaforma. Ricarica perciò la
        pagina.
      </Typography>
      <Spacer size={30} />
      <Typography variant="body">Il tuo account è stato perciò creato. Ti troverai ora con questa schermata:</Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/empty-data-home.png")} />
      <Spacer size={30} />
      <Typography variant="body">È arrivato perciò il momento di iniziare a inserire i dati!</Typography>
      <Spacer size={30} />
      <Typography variant="body">
        Partendo dal primo pannello in alto a sinistra potrai inserire il totale investito. Clicca perciò su modifica, muoviti sopra il campo e clicca per modificarlo. Una volta completato puoi
        cliccare su salva. Puoi fare questo passaggio anche in un secondo momento.
      </Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/edit-vesting.png")} />
      <Spacer size={30} />
      <Typography variant="body">
        Ora è il momento di modificare il portafoglio, utilizza lo stesso procedimento utilizzato precedentemente per modificare e salvare. Con il bottone verde + potrai aggiungere tipologie di
        rischio al tuo portafoglio. Puoi eliminare quando vuoi le tipologie create utilizzando il bottone rosso - .
      </Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/edit-wallet.png")} />
      <Spacer size={30} />
      <Typography variant="body">Troverai inoltre un campo per scrivere e aggiungere le tue monete. Ricorda che puoi aggiungere più voci di monete uguali.</Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/add-coins.png")} />
      <Spacer size={30} />
      <Typography variant="body">
        Ora è arrivato il momento di modificare le monete: per ognuna scegli la tipologia di appartenenza, l&apos;allocazione percentuale rispetto la tipologia (e non rispetto l&apos;intero
        portafoglio) e il numero di monete che possiedi.
      </Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/edit-coins.png")} />
      <Spacer size={30} />
      <Typography variant="body">Dopo aver salvato, se tutto è andato a buon fine, potrai vedere finalmente il ribilanciamento delle tue monete. Prendiamo come esempio questo screenshot:</Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/rebalancing-voices.png")} />
      <Spacer size={30} />
      <Typography variant="body">
        Come vedi ci sono 3 colonne.
        <br />
        <br />- La prima colonna identifica quanto una moneta è bilanciata. Nella prima riga USDC è bilanciata al 45%, il che vuol dire che possiedi solamente il 45% di monete USDC che dovresti
        possedere per avere l&apos;asset bilanciato.
        <br />
        <br />- La seconda colonna identifica quanto sei sbilanciato in valore euro/dollaro. Nella prima riga USDC è sbilanciato di 108.85€, il che vuol dire che per ribilanciare la posizione dovresti
        comprare un totale di USDC per un controvalore di 108.85€.
        <br />
        <br />- La terza colonna identifica quante monete servono per il bilanciamento. Nella prima riga USDC deve essere ribilanciata di 119.769 monete, il che vuol dire che dovresti comprare 119.769
        USDC per bilanciare la posizione.
      </Typography>
      <Spacer size={30} />
      <Typography variant="body">Utilizzando i bottoni in alto è possibile uscire, ricaricare i dati e cambiare valuta di riferimento (euro/dollaro).</Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/top-buttons.png")} />
      <Spacer size={30} />
      <Typography variant="body">Ti ricordiamo che la nostra piattaforma è totalmente responsive. Ti lasciamo qui sotto un esempio di portafoglio e uno screenshot da mobile.</Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/rebalancing-example.png")} />
      <Spacer size={15} />
      <div style={{ width: "100%" }}>
        <ScreenImage width={100} src={require("images/rebalancing-example-mobile.png")} style={{ margin: "auto" }} />
      </div>
      <Spacer size={30} />
      <Typography variant="body">Non ci resta perciò che augurarti buon ribilanciamento! A presto!</Typography>
      <Spacer size={30} />
      <Typography variant="body">
        Puoi contattarci a{" "}
        <BoldLabel>
          <a href="mailto:master.gunner96@yahoo.com" style={{ color: "black" }}>
            master.gunner96@yahoo.com
          </a>
        </BoldLabel>
      </Typography>
      <Spacer size={30} />
      <div style={{ width: "100%", textAlign: "center" }}>
        <Button onClick={() => router.push(homePath)}>{"Home/Login"}</Button>
      </div>
    </Wrapper>
  );
}
