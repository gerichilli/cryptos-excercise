function formartCurrency(number, rounding = null) {
  let [integerPart, decimalPart = ""] = number.toString().split(".");
  const intergerFormated = new Intl.NumberFormat().format(Number(integerPart));
  if (rounding)
    decimalPart = decimalPart
      ? decimalPart.slice(0, rounding)
      : decimalPart.padEnd(rounding, "0");
  return `${intergerFormated}${decimalPart ? `.${decimalPart}` : ""}`;
}

const Crypto = (props) => {
  return (
    <tr>
      <td>{props.marketCapRank}</td>
      <td>
        <div className="space-x-2 flex items-center">
          <img src={props.imgSrc} alt="" className="crypto-img"/>
          <span>{props.name}</span>
          <span className="uppercase">{props.symbol}</span>
        </div>
      </td>
      <td>{formartCurrency(props.currentPrice)}</td>
      <td
        className={props.priceChange24hPercent > 0 ? "text-green" : "text-red"}
      >
        {formartCurrency(props.priceChange24hPercent, 2)}
      </td>
      <td
        className={props.priceChange7dPercent > 0 ? "text-green" : "text-red"}
      >
        {formartCurrency(props.priceChange7dPercent, 2)}
      </td>
      <td>{formartCurrency(props.marketCap, 2)}</td>
      <td>
        <div className="space-x-2">
          <span>{props.circulatingSupply}</span>
          <span className="uppercase">{props.symbol}</span>
        </div>
      </td>
    </tr>
  );
};

export default Crypto;
