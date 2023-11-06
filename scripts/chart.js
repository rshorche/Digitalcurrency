let input = document.querySelector(".box-coin");

const navToggle = document.querySelector(".nav-toggle");
const navLine = document.querySelector(".nav-line");
const navListItems = document.querySelector(".nav-listItems");

navToggle.addEventListener("click", () => {
  navLine.classList.toggle("nav-line-active");
  navListItems.classList.toggle("nav-listItems-active");
});

let times = [];
let highPrice = [];
let lowPrice = [];
let openPrice = [];
let closePrice = [];

window.addEventListener("load", () => {
  let api =
    "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=2000";
  getCoin(api);
});

input.addEventListener("change", (e) => {
  let api = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${e.target.value}&tsym=USD&limit=2000`;
  times = [];
  highPrice = [];
  lowPrice = [];
  openPrice = [];
  closePrice = [];

  getCoin(api);
});

function getCoin(api) {
  fetch(api)
    .then((res) => res.json())
    .then((dates) => {
      const coinDates = dates.Data.Data;
      coinDates.forEach((coinDate) => {
        let newDate = new Date(coinDate.time * 1000);
        times.push(newDate);
        highPrice.push(coinDate.high);
        lowPrice.push(coinDate.low);
        openPrice.push(coinDate.open);
        closePrice.push(coinDate.close);
      });
      start();
    });
}
function start() {
  let trace1 = {
    x: times,

    close: closePrice,

    decreasing: { line: { color: "#7F7F7F" } },

    high: highPrice,

    increasing: { line: { color: "#17BECF" } },

    line: { color: "rgba(31,119,180,1)" },

    low: lowPrice,

    open: openPrice,

    type: "candlestick",
    xaxis: "x",
    yaxis: "y",
  };

  let data = [trace1];

  let layout = {
    dragmode: "zoom",
    margin: {
      r: 10,
      t: 25,
      b: 40,
      l: 60,
    },
    showlegend: false,
    xaxis: {
      autorange: true,
      domain: [0, 1],
      range: ["2017-01-03 12:00", "2017-02-15 12:00"],
      rangeslider: { range: ["2017-01-03 12:00", "2017-02-15 12:00"] },
      title: "تاریخ",
      type: "date",
    },
    yaxis: {
      autorange: true,
      domain: [0, 1],
      range: [114.609999778, 137.410004222],
      type: "linear",
      title: "دلار",
    },
  };

  Plotly.newPlot("myDiv", data, layout);
}
