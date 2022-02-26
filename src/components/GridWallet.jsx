const getRow = ({ typology, percentage, value }, index) => {
  const color = index % 2 === 0 ? "#f4f4f5" : "#D4D4D8";

  return [
    <input />,
    <input />,
    <Typography variant="body" style={style}>
      {value || "-"}
    </Typography>,
  ];
};

export const GridWallet = ({ wallet }) => {
  const walletData = wallet.reduce((r, walletDataRow, index) => {
    return [...r, ...getRow(walletDataRow, index)];
  }, []);

  return <Grid templateColumns={"250px 200px 200px"} data={walletData} />;
};
