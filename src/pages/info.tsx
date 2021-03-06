import { Button } from "components/Button";
import { Spacer } from "components/Spacer";
import { Typography } from "components/Typography";
import { useResponsive } from "hooks/useResponsive";
import Image from "next/image";
import { useClientRouter } from "hooks/useClientRouter";
import React, { FC } from "react";
import styled from "styled-components";
import { homePath, registrationPath } from "utils/paths";
import { useTranslation } from "react-i18next";
import { ChangeLanguageButton } from "components/ChangeLanguageButton";
import { contactMail } from "utils/constants";
import { useLanguage } from "hooks/useLanguage";

import AddCoinsImageEn from "images/info/en/add-coins.png";
import EditCoinsImageEn from "images/info/en/edit-coins.png";
import EditVestingImageEn from "images/info/en/edit-vesting.png";
import EditWalletImageEn from "images/info/en/edit-wallet.png";
import EmptyDataHomeImageEn from "images/info/en/empty-data-home.png";
import RebalancingVoicesImageEn from "images/info/en/rebalancing-voices.png";

import AddCoinsImageIt from "images/info/it/add-coins.png";
import EditCoinsImageIt from "images/info/it/edit-coins.png";
import EditVestingImageIt from "images/info/it/edit-vesting.png";
import EditWalletImageIt from "images/info/it/edit-wallet.png";
import EmptyDataHomeImageIt from "images/info/it/empty-data-home.png";
import RebalancingVoicesImageIt from "images/info/it/rebalancing-voices.png";

const englishImages = {
  AddCoinsImage: AddCoinsImageEn,
  EditCoinsImage: EditCoinsImageEn,
  EditVestingImage: EditVestingImageEn,
  EditWalletImage: EditWalletImageEn,
  EmptyDataHomeImage: EmptyDataHomeImageEn,
  RebalancingVoicesImage: RebalancingVoicesImageEn,
};

const italianImages = {
  AddCoinsImage: AddCoinsImageIt,
  EditCoinsImage: EditCoinsImageIt,
  EditVestingImage: EditVestingImageIt,
  EditWalletImage: EditWalletImageIt,
  EmptyDataHomeImage: EmptyDataHomeImageIt,
  RebalancingVoicesImage: RebalancingVoicesImageIt,
};

const images = {
  en: englishImages,
  it: italianImages,
  default: englishImages,
};

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0px auto;
  position: relative;
`;

const TopRightWrapper = styled.div`
  position: fixed;
  max-width: 700px;
  display: flex;
  justify-content: flex-end;
  z-index: 100;
  gap: 20px;
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
  const { language } = useLanguage();
  const correctImagesGroup = images[language || "en"];

  return (
    <Wrapper style={{ padding: getResponsiveValue(["20px 30px", "40px 40px", "60px 50px"]) }}>
      <TopRightWrapper style={{ width: `calc(100% - ${getResponsiveValue([30, 40, 50]) * 2}px)` }}>
        <ChangeLanguageButton />
        <Button onClick={() => router.push(homePath)}>
          <Typography variant="body2">{"Home/Login"}</Typography>
        </Button>
      </TopRightWrapper>
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
          <a href={`mailto:${contactMail}`} style={{ color: "black" }}>
            {contactMail}
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
      <ScreenImage src={correctImagesGroup.EmptyDataHomeImage as unknown as string} />
      <Spacer size={30} />
      <Typography variant="body">{t("info.panel1")}</Typography>
      <Spacer size={30} />
      <ScreenImage src={correctImagesGroup.EditVestingImage as unknown as string} />
      <Spacer size={30} />
      <Typography variant="body">{t("info.panel2")}</Typography>
      <Spacer size={30} />
      <ScreenImage src={correctImagesGroup.EditWalletImage as unknown as string} />
      <Spacer size={30} />
      <Typography variant="body">{t("info.panel3")}</Typography>
      <Spacer size={30} />
      <ScreenImage src={correctImagesGroup.AddCoinsImage as unknown as string} />
      <Spacer size={30} />
      <Typography variant="body">{t("info.panel4")}</Typography>
      <Spacer size={30} />
      <ScreenImage src={correctImagesGroup.EditCoinsImage as unknown as string} />
      <Spacer size={30} />
      <Typography variant="body">{t("info.panel5")}</Typography>
      <Spacer size={30} />
      <ScreenImage src={correctImagesGroup.RebalancingVoicesImage as unknown as string} />
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
          <a href={`mailto:${contactMail}`} style={{ color: "black" }}>
            {contactMail}
          </a>
        </BoldLabel>
      </InfoTypography>
      <Spacer size={30} />
    </Wrapper>
  );
}
