import coinInfo from "./data/coin-info.js";

const App = {
  $: {
    allCoins: document.querySelector('[data-id="all-coin-info"]'),
    menuIcon: document.querySelector('[data-id="menu-icon"]'),
    menuCloseIcon: document.querySelector('[data-id="menu-close-icon"]'),
    popupCloseIcon: document.querySelector('[data-id="popup-close-icon"]'),
    navBar: document.querySelector('[data-id="nav-section"]'),
    userInfoBasic: document.querySelector('[data-id="user-info-basic"]'),
    profileEnabler: document.querySelector('[data-id="profile-enabler"]'),
    investButton: document.querySelector('[data-id="invest-button"]'),
    withdrawButton: document.querySelector('[data-id="withdraw-button"]'),
  },

  init() {
    App.loadEventTimeout();
    App.AddAllCoins();
    App.dashBoardEventListeners();
  },

  loadEventTimeout() {
    setTimeout(() => {
      document.querySelector(".loader").classList.add("hidden");
      document.querySelector("main").classList.remove("hidden");
      document.querySelector("header").classList.remove("hidden");
    }, 3000);
  },

  dashBoardEventListeners() {
    App.$.menuIcon.addEventListener("click", () => {
      App.$.navBar.classList.remove("hidden");
    });

    App.$.menuCloseIcon.addEventListener("click", () => {
      App.$.navBar.classList.add("hidden");
    });

    App.$.profileEnabler.addEventListener("click", () => {
      App.$.userInfoBasic.classList.toggle("hidden");
    });

    document.body.addEventListener("click", () => {
      if (
        !App.$.userInfoBasic.classList.contains("hidden") &
        !App.$.navBar.classList.contains("hidden")
      ) {
        App.$.navBar.classList.add("hidden");
        App.$.userInfoBasic.classList.add("hidden");
        console.log("clicking");
      }
    });

    document.body.addEventListener("scroll", () => {
      if (
        !App.$.userInfoBasic.classList.contains("hidden") &
        !App.$.navBar.classList.contains("hidden")
      ) {
        App.$.navBar.classList.add("hidden");
        App.$.userInfoBasic.classList.add("hidden");
        console.log("scrolling");
      }
    });
  },

  AddAllCoins() {
    let coinHtml = "";

    coinInfo.forEach((coin) => {
      coinHtml += `
            <div class="user-coin-info js-user-coin-info border" >
            <img src="${coin.image}" class="coin-image js-coin-image"/>
            <div class="coin-info js-coin-info">
              <p class="coin-balance js-coin-balance">${(
                coin.quantity / 100000000
              ).toFixed(8)}</p>
              <p class="coin-name js-coin-name">${coin.name}</p>
              <p class="mining-rate js-coin-mining-rate">${
                coin.miningRate.basic
              }</p>
              <button class="coin-action-button invest-button js-invest-button" id="${
                coin.id
              }" data-shortname="${
        coin.nameshort
      }" data-id="invest-button" >Invest</button>
              <button class="coin-action-button withdraw-button js-withdraw-button" id="${
                coin.id
              } data-shortname=${
        coin.nameshort
      }" data-id="withdraw-button">Withdraw</button>
        </div>
      </div>
            `;

      App.$.allCoins.innerHTML = coinHtml;

      App.displayInvestPopup(coin);
    });
  },

  displayInvestPopup(coin) {
    document.querySelectorAll(".js-invest-button").forEach((investButton) => {
      investButton.addEventListener("click", (event) => {
        document
          .querySelector(".js-invest-pop-container")
          .classList.remove("hidden");
        console.log(investButton.dataset);
        const coinShortName = investButton.dataset.shortname;

        const html = `

                <div class="popup-close-icon-container">
                  <i class="fa-light fa-xmark fa-2xl" id="popup-close-icon" data-id="popup-close-icon"></i>

                  </div>
                <div class="invest-popup">
                  
                <div>
                  <label for="amount-to-invest">Amount to invest:</label>
                  <div class="grid">
                    <input id="amount-to-invest" type="number" placeholder="0.00000000"><span>${coinShortName}</span>
                  </div>
                </div>
                
                <div>
                <p class="label">Plan:</p>
                <div class="grid">
                  <div class="plan-container"><p>Basic</p> <span>3%/hr</span></div> <button class="coin-action-button plan-upgrade-button"><a href="#" class="upgrade-button">Upgrade</a></button>
                </div>
                </div>
                
                <div class="total-mine">
                  <p class="label">24 hour Revenue:</p>
                  <div class="grid">
                    <div>0.00000000
                    </div><span>${coinShortName}</span>
                  </div>
                </div>
          
                <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                ">
                  <button class="coin-action-button getaddressbtn js-getaddressbtn">Get Investment Address</button>
                </div>
          
              </div>
              
                `;

        document.querySelector(".js-invest-pop-container").innerHTML = html;

        document
          .querySelector('[data-id="popup-close-icon"]')
          .addEventListener("click", () => {
            document
              .querySelector(".js-invest-pop-container")
              .classList.add("hidden");
          });
      });
    });
  },
};
window.addEventListener("load", App.init);
