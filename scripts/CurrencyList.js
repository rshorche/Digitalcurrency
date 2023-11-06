const $ = document;
const navToggle = $.querySelector(".nav-toggle");
const navLine = $.querySelector(".nav-line");
const navListItems = $.querySelector(".nav-listItems");

const changeUsdt = $.querySelectorAll(".CurrencyList-top-btn");
const sectiontwo = $.querySelector(".CurrencyList-coinLlists");

//                                              toggle
navToggle.addEventListener("click", () => {
  navLine.classList.toggle("nav-line-active");
  navListItems.classList.toggle("nav-listItems-active");
});

//                                    change Usdt toman
let UsdtOrToman = false;

changeUsdt.forEach((btn) => {
  btn.addEventListener("click", () => {
    getApi(urlApi);

    changeUsdt.forEach((btn) =>
      btn.classList.remove("CurrencyList-top-btn-active")
    );
    btn.classList.add("CurrencyList-top-btn-active");
    if (btn.innerHTML === "تومان") {
      UsdtOrToman = true;
    } else {
      UsdtOrToman = false;
    }
  });
});

//                                                fetch
let urlApi =
  "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,DASH,ADA,XLM,TRX,BSV,TON,DOGE,BNB,SOL,DAI,LTC,OKB,ICP,AVA,IMV&tsyms=USD,&api_key=9b61a7db8dfaaf761fd43a4ff06130d7c03472756f9ddd8edba25a0620aa354c";

async function getApi(api) {
  let allCoin = [];

  await fetch(api)
    .then((res) => res.json())
    .then((allCoins) => {
      let coins = Object.entries(allCoins.RAW);
      coins.forEach((coin) => allCoin.push(coin));
    });
  generatedListCoin(allCoin);
  setCoin(allCoin);
}

//                                   generated list coin
async function generatedListCoin(coins) {
  sectiontwo.innerHTML = "";
  await coins.forEach((coin) => {
    sectiontwo.insertAdjacentHTML(
      "beforeend",
      `
    <div class="CurrencyList-bottom-crypto">
          <a class="CurrencyList-bottom-crypto-icon" href="#"
            ><img src="http://www.cryptocompare.com${
              coin[1].USD.IMAGEURL
            }" alt="icon crypto"/></a>

          <a class="CurrencyList-bottom-crypto-name" href="#"><span>${
            coin[0]
          }</span></a>
          
          <p class="CurrencyList-bottom-crypto-price">${changeTD(
            coin[1].USD.PRICE
          )}</p>

          <p class="CurrencyList-bottom-crypto-change ${ChangesColor(
            coin[1].USD.CHANGEPCT24HOUR.toFixed(2)
          )}">${coin[1].USD.CHANGEPCT24HOUR.toFixed(2)}</p>

          <div class="CurrencyList-bottom-crypto-charts">
            <div>
              <canvas id="${coin[0]}"></canvas>
            </div>
          <a href='chart.html' class="CurrencyList-bottom-crypto-btn">خرید / فروش</a>
          </div>
        </div>
    `
    );
  });
}

//                           change price color
function ChangesColor(change) {
  let isChange = true;

  if (change > 0) {
    isChange = true;
    return "CurrencyList-bottom-crypto-change-green";
  } else {
    isChange = false;
    return "CurrencyList-bottom-crypto-change-red";
  }
}
//                          change coin to toman
function changeTD(price) {
  if (UsdtOrToman) {
    return separate(price * 50000 + " تومان ");
  } else {
    return separate(price + " $ ");
  }
}
//                                     chart js
async function chartJS(coin) {
  let priceLists = [];
  await fetch(
    `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin.id}&tsym=USD&limit=29`
  )
    .then((res) => res.json())
    .then((coin) => {
      coin.Data.Data.forEach((priceList) => {
        priceLists.push(priceList.close);
      });
    });
  await new Chart(coin, {
    type: "line",
    data: {
      labels: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
      ],
      datasets: [
        {
          data: priceLists,
          borderWidth: 0.5,
          pointRadius: 0,
          borderColor: priceLists[6] > priceLists[7] ? "red" : "green",
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            display: false,
            major: {
              enabled: false,
            },
          },
          border: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
          border: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}
function setCoin(allCoin) {
  allCoin.forEach((coin) => {
    const coinElem = $.getElementById(`${coin[0]}`);
    chartJS(coinElem);
  });
}

//                  Separating three digits of numbers
function separate(Number) {
  Number += "";
  Number = Number.replace(",", "");
  x = Number.split(".");
  y = x[0];
  z = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
  return y + z;
}

getApi(urlApi);
