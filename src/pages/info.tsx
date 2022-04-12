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
import { ChangeLanguageButton } from "components/ChangeLanguageButton";

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0px auto;
  position: relative;
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

const InfoTypography: FC = ({ children }) => (
  <Typography variant={"body"} style={{ whiteSpace: "pre-line" }}>
    {children}
  </Typography>
);

export default function InfoPage() {
  const { getResponsiveValue } = useResponsive();
  const router = useClientRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "info_page_visited");
    }
  }, []);

  return (
    <Wrapper style={{ padding: getResponsiveValue(["20px 30px", "40px 40px", "60px 50px"]) }}>
      <div style={{ position: "fixed", maxWidth: 700, display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <ChangeLanguageButton />
      </div>
      <Spacer size={20} />
      <div style={{ width: "100%", textAlign: "center" }}>
        <Typography variant="title">{t("info.title1")}</Typography>
      </div>
      <Spacer size={30} />
      <InfoTypography>
        {t("info.aboutProject")}
        <BoldLabel>{t("info.ourVisionBold")}</BoldLabel>
      </InfoTypography>
      <InfoTypography>
        {`${t("info.aboutRebalancing")} `}
        <BoldLabel>
          <a href="https://thecryptogateway.it/investimento-cosa-vuol-dire-ribilanciamento-del-portafoglio/" rel="noreferrer" target={"_blank"} style={{ color: "black" }}>
            {t("info.hereRef")}
          </a>
        </BoldLabel>
        {` ${t("info.linkDescription")}`}
      </InfoTypography>
      <Spacer size={30} />
      <Typography variant="body">
        {t("info.toolDescription")}
        <br />
        <br />
        {t("info.functionality1")}
        <br />
        <br />
        {t("info.functionality2")}
        <br />
        <br />
        {t("info.functionality3")}
      </Typography>
      <Spacer size={30} />
      <Typography variant="body">
        {t("info.applicationInfo")}
        <br />
        <br />
        {t("info.info1")}
        <br />
        <br />
        {t("info.info2")}
        <br />
        <br />
        {t("info.info3")}
        <br />
        <br />
        {t("info.info4")}
        <br />
        <br />
        {t("info.info5")}
      </Typography>
      <Spacer size={30} />
      <Typography variant="body">
        {`${t("info.helpFeedback")} `}
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
      <InfoTypography>
        {`${t("info.introTutorial")} `}
        <BoldLabel>
          <a href="https://thecryptogateway.it/costruzione-del-portafoglio-di-investimento/" rel="noreferrer" target={"_blank"} style={{ color: "black" }}>
            {t("info.hereRef")}
          </a>
        </BoldLabel>
        {` ${t("info.linkDescription2")}`}
      </InfoTypography>
      <Spacer size={30} />
      <InfoTypography>
        {t("info.registrationLink")}
        <BoldLabel>
          <a href={registrationPath} target={"_blank"} rel="noreferrer" style={{ color: "black" }}>
            {`${t("info.hereRef")}.`}
          </a>
        </BoldLabel>
      </InfoTypography>
      <InfoTypography>{t("info.registrationPhase")}</InfoTypography>
      <Spacer size={30} />
      <ScreenImage src={require("images/empty-data-home.png")} />
      <Spacer size={30} />
      <Typography variant="body">{t("info.panel1")}</Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/edit-vesting.png")} />
      <Spacer size={30} />
      <Typography variant="body">{t("info.panel2")}</Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/edit-wallet.png")} />
      <Spacer size={30} />
      <Typography variant="body">{t("info.panel3")}</Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/add-coins.png")} />
      <Spacer size={30} />
      <Typography variant="body">{t("info.panel4")}</Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/edit-coins.png")} />
      <Spacer size={30} />
      <Typography variant="body">{t("info.panel5")}</Typography>
      <Spacer size={30} />
      <ScreenImage src={require("images/rebalancing-voices.png")} />
      <Spacer size={30} />
      <Typography variant="body">
        {t("info.panel6")}
        <br />
        <br />
        {t("info.column1")}
        <br />
        <br />
        {t("info.column2")}
        <br />
        <br />
        {t("info.column3")}
      </Typography>
      <InfoTypography>
        {t("info.outro")}
        <BoldLabel>
          <a href="mailto:master.gunner96@yahoo.com" style={{ color: "black" }}>
            {t("info.helpMail")}
          </a>
        </BoldLabel>
      </InfoTypography>
      <Spacer size={30} />
      <div style={{ width: "100%", textAlign: "center" }}>
        <Button onClick={() => router.push(homePath)}>{"Home/Login"}</Button>
      </div>
    </Wrapper>
  );
}
