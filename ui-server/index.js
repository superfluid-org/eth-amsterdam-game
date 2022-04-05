const express = require('express');
const app = express();
const cors = require('cors');
const { Framework } = require("@superfluid-finance/sdk-core");
const ethers = require("ethers");
const faucet = require("../artifacts/contracts/ETHAmsterdamFaucet.sol/ETHAmsterdamFaucet.json");
const faucetABI = faucet.abi;

const url = "https://eth-kovan.alchemyapi.io/v2/nl2PDNZm065-H3wMj2z1_mvGP81bLfqX";
const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

//middleware -anytime you create middleware you need to use app.use
app.use(cors());
//request.body comes from client
app.use(express.json()); //this allows us to use request.body when making req and getting res

//ROUTES

app.post("/create-stream", async (req, res) => {

    console.log("running..");
    
    try {
        
        const { code, address } = req.body;

        //function for lambda is here
        async function createStream(_code, _address) {

            const codes = [
                "lXAF32",
                "fsTCU3",
                "RgSodn",
                "CEMzMV",
                "kSW9o3",
                "YnzBnv",
                "Nl4zu9",
                "hawRNT",
                "IxwHgc",
                "HEhK8M",
                "YwmPwl",
                "nEz35f",
                "GsBq63",
                "fi41uq",
                "topEPK",
                "uOXBRn",
                "6CtmFQ",
                "IRn4A2",
                "crnTDE",
                "PE1l0G",
                "jxvxgi",
                "gDj06Q",
                "jE126U",
                "hyQkQz",
                "CkIthI",
                "0EYWfh",
                "OL0jIb",
                "RVZcar",
                "j8MTe7",
                "QJKHsW",
                "DkeIao",
                "Chdw8b",
                "2qHdLg",
                "W3fPdD",
                "paBPBB",
                "HvFaLc",
                "rV8Fq7",
                "o6InLy",
                "ICp4JC",
                "3fHKPS",
                "FQaUxH",
                "zHj4Vj",
                "ZfUISj",
                "fDAqSj",
                "3BcaD3",
                "BB0mRP",
                "BuUSPK",
                "WuhVVb",
                "2N7VPL",
                "HKExzL",
                "4KcZbQ",
                "sUlCTo",
                "8zWziM",
                "VKeiec",
                "vkpRIe",
                "NwHUCn",
                "clKZVU",
                "YbIVnR",
                "zXEXfK",
                "uQ6fkZ",
                "LAIVUc",
                "y2Ik4t",
                "B6iWPt",
                "EaHHLV",
                "5H0W4A",
                "xg4hbG",
                "FBGfsX",
                "2g4BZJ",
                "wfANXK",
                "1wTwBI",
                "IcrN6k",
                "IPy84Z",
                "oJlSQo",
                "hG2JqK",
                "MCtyLk",
                "MYjgbN",
                "gO55xi",
                "QhWcSP",
                "ovFBu5",
                "BhwifC",
                "RAGiBQ",
                "ZAlaFJ",
                "MFbnSD",
                "ZO5A75",
                "5WmLKc",
                "BnLE3E",
                "cOzC3o",
                "ygnFdH",
                "WDbRt6",
                "vqf7TY",
                "9907AG",
                "bsrpK6",
                "9qLTcl",
                "oOaKyS",
                "iKJSLI",
                "ntZjr1",
                "3qEFO7",
                "k0rQ6e",
                "3A3h0d",
                "pqk456",
                "t2CraJ",
                "0zvLZq",
                "F4ZmQE",
                "B6jtib",
                "s7MNNu",
                "nxO4bM",
                "RisAyc",
                "3sIkvh",
                "zEbpxz",
                "46T8bc",
                "J63bUo",
                "4Pm6Oj",
                "3648nx",
                "JHFM6u",
                "0MehAZ",
                "zVNUlp",
                "SfbXCP",
                "3fV5T8",
                "UjeyQd",
                "cRx88t",
                "2QOnmU",
                "2GRWIx",
                "uADwL0",
                "UR9nkm",
                "ILN2eC",
                "UG5TXx",
                "bkVERl",
                "bqIcAJ",
                "kYmdGf",
                "BKaDJf",
                "41p0iG",
                "nuZwvT",
                "hYn0Q7",
                "mNahCq",
                "j3RPVs",
                "H9vVD9",
                "osvJHU",
                "Wwjc0L",
                "FHYqkl",
                "EQAOV9",
                "7Vwpa9",
                "ATh1vd",
                "Mq6qU3",
                "4afutC",
                "5NvrfL",
                "0cqN1y",
                "FjN6LZ",
                "p9d6LS",
                "Mpxnkr",
                "gifJgK",
                "jB9qjP",
                "fvDMam",
                "ytxah1",
                "TiQiak",
                "cKrSqK",
                "YBEXD0",
                "UIbhYk",
                "gbOiJz",
                "rqB1ve",
                "iU7hle",
                "52dP48",
                "NIF3j5",
                "XKQ1iy",
                "NYC04w",
                "Ftli5f",
                "QfTGWa",
                "gxtYVw",
                "jU5Sve",
                "jxNQzb",
                "IJMnua",
                "IZ9twC",
                "QFLSar",
                "9CQtk7",
                "t0fON7",
                "zs3UnZ",
                "3vwIbU",
                "iGA5PE",
                "qP2RL8",
                "GwqeKr",
                "9c9D5U",
                "8xjVt6",
                "Hr3OU2",
                "N19kSv",
                "37Tyo7",
                "Ki7yY3",
                "Clusa1",
                "VcouF7",
                "tnWthQ",
                "Y1uuDK",
                "PFgs2e",
                "zbxNY7",
                "VmapCq",
                "Jy2kQv",
                "CkSpOf",
                "ZDkwed",
                "qSnPZM",
                "VEoqqd",
                "DBqqKf",
                "9q2wLt",
                "mWOmMr",
                "Ixm4Xj",
                "GaiJ8R",
                "G2RIWU",
                "S9iu92",
                "hEM5pf",
                "kngdN8",
                "QWqfab",
                "crayCc",
                "B4OwBF",
                "EhEpnw",
                "pWN03P",
                "h5yzHY",
                "KAQ7cW",
                "I48GH2",
                "iah5Ql",
                "dWTlJA",
                "sTsxBZ",
                "IHkKK8",
                "5TPgp2",
                "dJAq2z",
                "Cyyyud",
                "RCrsnF",
                "q2Urvr",
                "xMyE0E",
                "VrIURs",
                "wKc4Tx",
                "uCoTMj",
                "jQS8jy",
                "bX8QpP",
                "1lnG55",
                "nw7Fuw",
                "0G6b6E",
                "w9EMYP",
                "Q9nd2s",
                "88Pb7x",
                "etSK1Z",
                "LmLV9j",
                "UjKj6J",
                "sHu4H1",
                "fStu3i",
                "0jPqzq",
                "h0aazz",
                "ug2WCn",
                "beZD3z",
                "BwW86f",
                "G6Ms6u",
                "wMjG3x",
                "VYU6ni",
                "38K1Gd",
                "Dl54Un",
                "xXAF8e",
                "vUGMMo",
                "7oIZTH",
                "aPiwPA",
                "D23WDr",
                "1pKUqi",
                "53LSY8",
                "7OtSLy",
                "G24N1b",
                "9vsXw6",
                "LJRQw3",
                "jBu2Nr",
                "l3RyVs",
                "L92sWk",
                "gQ86qe",
                "KQyJji",
                "ZpG6QU",
                "Y08sJV",
                "vqgF9V",
                "oKRCWi",
                "AQgSHN",
                "34JsXZ",
                "R3DcXz",
                "BLj49g",
                "frPOr8",
                "r6h4bH",
                "UCU5IQ",
                "7KyQvA",
                "mNfwIw",
                "2noJhu",
                "rtC3Cg",
                "hLiCi4",
                "lq16gl",
                "rPxfjU",
                "RWxrIe",
                "OzKaTW",
                "0lBxHM",
                "zVFl7w",
                "vFXRJ1",
                "zxDMp1",
                "1WmSUy",
                "6XxQbD",
                "C40OXK",
                "1xZdcr",
                "cKHfVM",
                "UdElVq",
                "s8VLFx",
                "RerXru",
                "wgvk5f",
                "GV7kVl",
                "Ho4Ru0",
                "7HW9DT",
                "bJCjyT",
                "IFqDS6",
                "qG322K",
                "OgmNFl",
                "43FWFo",
                "9KV8WV",
                "P7ljdR",
                "UGl1og",
                "Btapjk",
                "3anvom",
                "ITpfwi",
                "nI5Upo",
                "fH0x2i",
                "RJgRtl",
                "6aiy3P",
                "CHov1N",
                "3329K8",
                "CAYAwg",
                "29fNix",
                "hy8PoQ",
                "X4ntAF",
                "aSjrOJ",
                "SYHGud",
                "TPi0xb",
                "Cj48g0",
                "eX6BFJ",
                "eVizVT",
                "xovfQD",
                "XYcOWM",
                "x1vPF1",
                "jPK6Sh",
                "8CtIiJ",
                "6pve45",
                "kbKHo4",
                "p7DzEG",
                "B74Got",
                "F1XH4j",
                "ZMfoMN",
                "fh6NfH",
                "2PsuBv",
                "9U3P8D",
                "EOWHtp",
                "f7AHq1",
                "a2q9v0",
                "3zRWbh",
                "gRJ1q4",
                "0Ccd1I",
                "qQQhsS",
                "oAL21U",
                "D4ZKne",
                "jVXLxi",
                "mmkFKx",
                "xm6L7Z",
                "wVPXvF",
                "fktpuw",
                "ZDEpb8",
                "FsvVSV",
                "GvcWOP",
                "pG77H8",
                "azYytC",
                "tQcEky",
                "h87AD6",
                "7Xf3XL",
                "slr1nv",
                "NRYFeG",
                "euuN33",
                "DwaiJA",
                "WFHtvx",
                "I4v7zu",
                "mxQFOP",
                "Gb1hOo",
                "Nk2tU1",
                "jPtwRi",
                "7RnP3s",
                "dUslqA",
                "Sh7Y6v",
                "utDzXN",
                "9YSnDz",
                "Vz6SIG",
                "VcjbNE",
                "87kEA6",
                "FFHqwj",
                "7RFZjv",
                "UBGvpG",
                "oUjKaT",
                "d3c7m0",
                "7E9F8M",
                "3IhWqQ",
                "FuBa0F",
                "BRrnTe",
                "velC0f",
                "SoEwhj",
                "L547ln",
                "zjwaYM",
                "l2FaN7",
                "tZz0Yn",
                "El298A",
                "N2csof",
                "vSOXtQ",
                "TLj4h5",
                "jwYcat",
                "e4uYpz",
                "gUauIE",
                "pgwJ78",
                "G59zkJ",
                "xhJsiC",
                "QjiiTD",
                "Jg1nCE",
                "0DSB6Z",
                "DgsWEe",
                "4oSWL2",
                "6j2qjw",
                "ekw71K",
                "ohkmIC",
                "AguYc8",
                "zRFpRw",
                "stEAW0",
                "rpN5vw",
                "hSGL4Y",
                "sIFldD",
                "4dOvpV",
                "tq39yz",
                "SfmhJl",
                "06jqVM",
                "Ul2kXm",
                "pd4wi3",
                "LYl4PN",
                "EZBVJ0",
                "O52L0t",
                "TTvyNu",
                "DpOMN9",
                "HPrT9A",
                "UlTNtK",
                "B944so",
                "5HI9kh",
                "GGWXCX",
                "QlvmJT",
                "H7GexS",
                "93qZ0N",
                "EieiEj",
                "vCbD3T",
                "zJWLXE",
                "fTTP5E",
                "KV6Mun",
                "UHiocv",
                "q5TQKu",
                "K7lt6n",
                "dWI9TW",
                "oLvw66",
                "UD0jtU",
                "wQvRZL",
                "LsJQPJ",
                "0IctLo",
                "SthXiP",
                "L5mxwC",
                "ZBd2Om",
                "jVxuNz",
                "beMpH7",
                "Jh8Wz8",
                "fvlGe8",
                "H8gnxo",
                "VTjwyb",
                "i5sHtJ",
                "M72xB8",
                "Pe2oMe",
                "UqbvQ9",
                "e6rpXR",
                "6NhI7B",
                "AlgDQg",
                "C1pdIu",
                "D92xYa",
                "wHyYgb",
                "RoIXZK",
                "KpB4h5",
                "lnySFF",
                "f2yGgt",
                "9gRvjl",
                "TePuAV",
                "7kHbup",
                "jIFmeF",
                "FLZOPd",
                "Gawxiu",
                "PSchVV",
                "QZ6Dee",
                "8G7Yqk",
                "PF8h7Z",
                "hatxJ0",
                "CPApi4",
                "4t98EN",
                "ZR7KMF",
                "17Gdd5",
                "yR2lwv",
                "fltiaL",
                "gNAF06",
                "nWThvc",
                "d5DU3d",
                "IZ8Aq7",
                "1SMFE8",
                "x7HQta",
                "S4WcYe",
                "XPbbho",
                "xBNT5J",
                "vm4YpP",
                "HKqsb3",
                "C41FZA",
                "HuYuSF",
                "fEBwkh",
                "eKXJ4r",
                "sgzC0P",
                "s3rid1",
                "LXcwRH",
                "lse4XU",
                "PG7wOH",
                "QZN5hd",
                "j04jZ3",
                "jVS0Xy",
                "J3X4Cb",
                "pgUdKH",
                "dW2XnS",
                "B4s0EB",
                "kA3Xtm",
                "aZliLv",
                "EsovS6",
                "AeCB1Q",
                "lR9iIe",
                "xcGSfi",
                "Tcr2Ds",
                "m8DdOW",
                "mZR9l3",
                "vxWje7",
                "e6b6oO",
                "dhIwzE",
                "k1j8Ki",
                "UXllyV",
                "Bh4ikq",
                "wM9wtR",
                "8DMub7",
                "O5cEY8",
                "ZJe11x",
                "VhGXfP",
                "yPrFNf",
                "Afkdqv",
                "wmraie",
                "rMWgJO",
                "QRzY0O",
                "3FOWt6",
                "l8vrJ4",
                "IXqfvd",
                "1jlPie",
                "a2cGl8",
                "Klqmkg",
                "0sBhZc",
                "FqDNwK",
                "Z0m01A",
                "Dg7SI3",
                "UZlT0D",
                "KvvRE9",
                "4zXD7I",
                "8snuoP",
                "kwaFm1",
                "J75n4m",
                "hT4Uvk",
                "6vUtR5",
                "oIbzvO",
                "vbiCJC",
                "gDG3Hv",
                "bIDh3U",
                "fDLAez",
                "oOs5dW",
                "P9s6G5",
                "0xxjop",
                "vV7QlD",
                "vlD767",
                "z86LVF",
                "ctjYAg",
                "t983EO",
                "kiwMD2",
                "NNd3E9",
                "T6kk93",
                "SOExlp",
                "gRu0iq",
                "aFtJfS",
                "6fb43P",
                "wK2QZk",
                "YlWXA7",
                "1XGsMg",
                "eJQ6iF",
                "CSGBu8",
                "T5zRM6",
                "9IaXPF",
                "bn8xkX",
                "4oyAM2",
                "y6e14b",
                "QrizBz",
                "Nh1arx",
                "PFk4Dc",
                "NSOFAF",
                "rsL0NV",
                "4I2IAf",
                "XDwtbM",
                "aUsbbo",
                "U0YOKv",
                "O4tVmz",
                "OdRO89",
                "scZtAx",
                "Afy9Nt",
                "bUagfd",
                "WWDlw3",
                "ZgSIYD",
                "mKuFAx",
                "Jweunr",
                "o3XDnG",
                "9x7Z60",
                "00vhKv",
                "LvJakO",
                "FqyH4D",
                "MaCkhx",
                "58xfxv",
                "BweI4M",
                "9CUSDp",
                "CwcQ8M",
                "WR4aqG",
                "JaLasC",
                "Anv1zi",
                "gCBYsm",
                "eEUIkO",
                "Yn9gxp",
                "dKVjaF",
                "bM15uL",
                "U4xIvW",
                "mxe7M6",
                "a70Fp8",
                "yJ83kq",
                "357tq7",
                "bIbyPm",
                "fbtvnH",
                "DfolVd",
                "Yf9oO8",
                "zVgzhm",
                "vjGRw1",
                "hNvRoU",
                "aH2IHc",
                "xVNasB",
                "fVUIfJ",
                "bv8fy7",
                "0Lpw2D",
                "1Ut0JW",
                "jgajqL",
                "BWxjiZ",
                "XnJjCM",
                "azeQX6",
                "aCb8w4",
                "naQFxG",
                "fkeQ9x",
                "bNxhUs",
                "mm1sUj",
                "aBfzac",
                "ha5xGg",
                "A8AzHn",
                "blcVT8",
                "Z1bldl",
                "miuraS",
                "wXOh5F",
                "4n0QWx",
                "97xmRi",
                "SVw9Iu",
                "TiLrsj",
                "f2w31b",
                "2OcXxL",
                "D2CeV1",
                "LO0PaS",
                "TXinwH",
                "KUdBXx",
                "vfHLgY",
                "V7Tdip",
                "yMnKpm",
                "eani7j",
                "d7eawe",
                "mbdcYs",
                "iD9hNM",
                "s4IVTV",
                "xnQPNH",
                "EuR91T",
                "CNYb6g",
                "6Z3UtJ",
                "Vz7Sxi",
                "yZNRyT",
                "TpIlfY",
                "JDXlL5",
                "4TEiHA",
                "9XxxWh",
                "ub7RSR",
                "izeKCA",
                "ixT1De",
                "jL1hnY",
                "GbPU6W",
                "hMlrON",
                "l5iw5M",
                "P8mOZP",
                "cLqSRr",
                "0cNX8I",
                "MKWdfG",
                "wfkPIC",
                "qmMn77",
                "bgIQxO",
                "sjrMvc",
                "I83wOA",
                "XHoucn",
                "5F11ES",
                "w1t10g",
                "6wQMb6",
                "YaYCd2",
                "eAWm1a",
                "JAkVmP",
                "JEyu11",
                "oQHhAY",
                "0fiKxP",
                "gc1fMg",
                "qpQuae",
                "rjVj2F",
                "k7mRIA",
                "r9LdRV",
                "5G23yi",
                "d93I0Z",
                "lAegUf",
                "u2VuTJ",
                "OlF1hm",
                "68A5Q1",
                "IV7tfx",
                "ln3uuY",
                "CDZ9Ft",
                "keHMCu",
                "L406t6",
                "eWRPJp",
                "EUtgA8",
                "QVHoIG",
                "PzOj8P",
                "t5UkDP",
                "uURz9c",
                "r9s095",
                "QdhxmI",
                "XOh3Cm",
                "WVhZ2e",
                "2E9sJ9",
                "gTTavK",
                "lW1QhI",
                "qD5TWy",
                "jS2qGW",
                "xWxlaz",
                "cRCXao",
                "J8z8pO",
                "ufb3Af",
                "wa6pKf",
                "6YUKNv",
                "vZEGmq",
                "fDc8or",
                "c5u3bp",
                "6wAJwP",
                "lOmoBG",
                "gBcCJv",
                "mO8Xuo",
                "Gkw01M",
                "FzpkUi",
                "Q9QlEb",
                "UPTCla",
                "mzk1m4",
                "JO9Exl",
                "9plbQu",
                "GbeUGj",
                "pxZ01G",
                "AzQBMd",
                "Mm88gK",
                "4dYixS",
                "WNvMpI",
                "LuCnL6",
                "5ZeVmO",
                "7PGwN7",
                "05R2tg",
                "hcC2cX",
                "H8Jo4i",
                "hrMHdZ",
                "8lH7Uu",
                "EiRlnI",
                "6Dxlhf",
                "x25n6F",
                "lXxT0F",
                "YpisZs",
                "7niBrM",
                "wLcGLq",
                "QFCHSI",
                "tkCoIY",
                "JsQNbi",
                "MW9lM5",
                "DNyhRN",
                "Wnywsm",
                "BvzFJJ",
                "uHIoUm",
                "J8hl5w",
                "cRP8fZ",
                "6oUOaI",
                "D5fT4K",
                "7oyeH8",
                "CLMSnk",
                "thaCiq",
                "Ofg1yv",
                "PIEEXH",
                "Z0gEg4",
                "vj7YDP",
                "fa65X2",
                "UOWKmP",
                "AQuWpp",
                "OiZFY3",
                "s5UkUo",
                "t2qySq",
                "YO5fN5",
                "pTszyq",
                "pCjr5F",
                "Jh21pA",
                "xlGw5f",
                "p3vauB",
                "sDVO7p",
                "egHss7",
                "aTDVzd",
                "98ApFR",
                "yay64c",
                "QGUCSG",
                "QchvMz",
                "SVid3s",
                "KhAuGS",
                "MF2pIw",
                "ogNktC",
                "VNVxC8",
                "nQJvuR",
                "3zGQ9y",
                "XHk2Rl",
                "nEv2us",
                "SX7j2a",
                "KeFvh8",
                "vExLGZ",
                "eHfntA",
                "xz7mmF",
                "ZyWi9d",
                "MfuwHp",
                "DyRYaY",
                "27Nv8F",
                "zwvmit",
                "aKy65W",
                "jKzX1b",
                "CTSuBL",
                "IPRjSV",
                "6eU1va",
                "YyX7FQ",
                "TbHu6m",
                "Dm5EJv",
                "C56ZpX",
                "yED8Tx",
                "ejB6Ob",
                "YiIu8D",
                "iTj81o",
                "DiUBBm",
                "Y5ukUC",
                "QDdjV3",
                "USRH6O",
                "cHgJKV",
                "ZIM0iB",
                "Z4j9eQ",
                "eQhXZx",
                "YOT2Mt",
                "09mXH6",
                "2tLCf4",
                "KAfRVM",
                "LbxuC1",
                "nXIwOF",
                "c1uU0T",
                "0K4fZF",
                "HN41aN",
                "EEgJXc",
                "J3uv2V",
                "f05R7V",
                "o2c975",
                "M1neyn",
                "KeqpC1",
                "a6mXBZ",
                "G2jIAt",
                "CjgemN",
                "CRj1Ju",
                "sI0jZL",
                "JiWrJn",
                "dDEhK8",
                "dU1X7D",
                "9uwwXu",
                "gw2gbr",
                "ydSDaJ",
                "j5lDKu",
                "ZO9j6f",
                "D0PU5q",
                "HATHoN",
                "Sp43Xk"
                ];

            let codeValid = false;

            for (let i = 0; i < codes.length; i++) {
                if (_code == codes[i]) {
                    codeValid = true;
                }
            }

            if (codeValid == false) {
                console.log("this code does not exist my fren");
            }

            else {

            const sf = await Framework.create({
                networkName: "kovan",
                provider: customHttpProvider
              });
            
              const signer = sf.createSigner({
                privateKey:
                  "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
                provider: customHttpProvider
              });
            
              //on kovan
              const faucetAddress = "0xFf3e1498E770109933Ecc285A81d83Bc37cABd7b";
                          
              const faucetContract = new ethers.Contract(
                faucetAddress,
                faucetABI,
                customHttpProvider
              );

              const hashedCode = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(_code + "mister mister"));
              
              try {
                await faucetContract.connect(signer).createDAIxFlow(hashedCode, _address);
            
                console.log("Creating your stream...");
            
                console.log(`Congrats - you've just created a money stream!`);
              } catch (error) {
                console.log(
                  "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
                );
                res.status(500).send('stream not created')

                res.json("error - stream not created")
                return
                console.error(error);
              }
            }
        }
        
        const result = await createStream(code, address);

        res.json(result);
        
    } catch (err) {
        
        console.error(err.message);
        
    }
});

app.listen(5000, () => {
    console.log('server has started on port 5000');
})

