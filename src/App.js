import React from "react";
import Crypto from "./components/Crypto";

const URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d";

export default class App extends React.Component {
  state = {
    cryptos: [],
    loading: true,
    errorMessage: "",
    query: "",
    querySubmit: false
  };

  getData = (url) => {
    fetch(url)
    .then((res) => {
      return new Promise((resolve) => {
        return res.json().then((data) => {
          resolve({
            status: res.status,
            statusText: res.statusText,
            ok: res.ok,
            data: data
          });
        });
      });
    })
    .then((jsonRes) => {
      if (!jsonRes.ok) {
        // get error message from body or default to response statusText
        const error =
          (jsonRes.data && jsonRes.data.message) || jsonRes.statusText;
        throw new Error(error);
      }
      this.setState({ cryptos: jsonRes.data || [], loading: false });
    })
    .catch((error) => {
      this.setState({ errorMessage: error, loading: false });
    });
  }

  componentDidMount() {
    this.getData(URL);
    // if(!this.state.querySubmit) {
    //   setInterval(() => this.getData(URL), REFRESH_TIME * 1000);
    // }
  }

  onSearchChange = (event) => {
    const isValid = event.target.value ? true : false;
    if(!event.target.value) this.getData(URL);
    this.setState({ query: event.target.value, querySubmit: isValid });
  }

  onSearchSubmit = (event) => {
    const filteredData = this.state.cryptos.filter(crypto => crypto.name.indexOf(this.state.query) >= 0);
    this.setState({ cryptos : filteredData});
    event.preventDefault();
  }

  render() {
    const thTitles = [
      "#",
      "Name",
      "Price",
      "24h %",
      "7d %",
      "Market cap",
      "Circulating Supply"
    ];
    const thCollect = thTitles.map((th) => <th key={th}>{th}</th>);
    const cryptosTd = this.state.cryptos.map((cry) => {
      return (
        <Crypto
          key={cry.id}
          marketCapRank={cry.market_cap_rank}
          imgSrc={cry.image}
          name={cry.name}
          symbol={cry.symbol}
          currentPrice={cry.current_price}
          priceChange24hPercent={cry.price_change_percentage_24h_in_currency}
          priceChange7dPercent={cry.price_change_percentage_7d_in_currency}
          marketCap={cry.market_cap}
          circulatingSupply={cry.circulating_supply}
        />
      );
    });
    if (this.state.errorMessage) {
      return <div>{this.state.errorMessage}</div>;
    } else if (this.state.loading) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <form className="flex justify-center items-center search-wrapper space-x-2" onSubmit={this.onSearchSubmit}>
            <input className="search-input" type="text" value={this.state.query} onChange={this.onSearchChange}/>
            <button className="search-btn" disabled = {!this.state.querySubmit}>Search</button>
          </form>
          <table>
            <thead>
              <tr>{thCollect}</tr>
            </thead>
            <tbody>{cryptosTd}</tbody>
          </table>
        </div>
        
      );
    }
  }
}
