// Import necessary modules. You might need to adjust these imports
// depending on how you manage dependencies in a serverless environment.
const yahooFinance = require('yahoo-finance2').default;
const etfs = [
    { ticker: 'TQQQ', leverage: 3, asset: 'QQQ' },
    { ticker: 'SOXL', leverage: 3, asset: 'SOXX' },
    { ticker: 'QLD', leverage: 2, asset: 'QQQ' },
    { ticker: 'SSO', leverage: 2, asset: 'SPY' },
    { ticker: 'SPXL', leverage: 3, asset: 'SPY' },
    { ticker: 'TECL', leverage: 3, asset: 'XLK' },
    { ticker: 'UPRO', leverage: 3, asset: 'SPY' },
    { ticker: 'FNGU', leverage: 3, asset: {"META": 12.53, "TSLA": 11.71, "NVDA": 10.66, "AMD": 10.03, "NFLX": 9.65, "AAPL": 9.39, "AMZN": 9.35, "SNOW": 9.10, "MSFT": 8.84, "GOOGL": 8.74} },
    { ticker: 'TNA', leverage: 3, asset: 'IWM' },
    { ticker: 'FAS', leverage: 3, asset: 'XLF' },
    { ticker: 'NRGU', leverage: 3, asset: {"PSX": 11.07, "VLO": 10.30, "CVX": 10.27, "MPC": 10.10, "COP": 9.93, "HES": 9.81, "EOG": 9.75, "PXD": 9.62, "XOM": 9.58, "OXY": 9.57 } },
    { ticker: 'LABU', leverage: 3, asset: 'XBI' },
    { ticker: 'TSLL', leverage: 1.5, asset: 'TSLA' },
    { ticker: 'BULZ', leverage: 3, asset: 'HERO' },
    { ticker: 'DPST', leverage: 3, asset: 'KRE' },
    { ticker: 'UDOW', leverage: 3, asset: 'DIA' },
    { ticker: 'ROM', leverage: 2, asset: 'IYW' },
    { ticker: 'YINN', leverage: 3, asset: 'FXI' },
    { ticker: 'UYG', leverage: 2, asset: 'XLF' },
    { ticker: 'NUGT', leverage: 2, asset: 'GDX' },
    { ticker: 'GUSH', leverage: 2, asset: 'XOP' },
    { ticker: 'DDM', leverage: 2, asset: 'DIA' },
    { ticker: 'ERX', leverage: 2, asset: 'XLE' },
    { ticker: 'USD', leverage: 2, asset: 'SMH' },
    { ticker: 'URTY', leverage: 3, asset: 'IWM' },
    { ticker: 'CWEB', leverage: 2, asset: 'KWEB' },
    { ticker: 'NAIL', leverage: 3, asset: 'XHB' },
    { ticker: 'JNUG', leverage: 2, asset: 'GDXJ' },
    { ticker: 'NVDL', leverage: 1.5, asset: 'NVDA' },
    { ticker: 'SPUU', leverage: 2, asset: 'SPY' },
    { ticker: 'FNGO', leverage: 2, asset: {"META": 12.53, "TSLA": 11.71, "NVDA": 10.66, "AMD": 10.03, "NFLX": 9.65, "AAPL": 9.39, "AMZN": 9.35, "SNOW": 9.10, "MSFT": 8.84, "GOOGL": 8.74} },
    { ticker: 'UWM', leverage: 2, asset: 'IWM' },
    { ticker: 'CURE', leverage: 3, asset: 'XLV' },
    { ticker: 'DFEN', leverage: 3, asset: 'ITA' },
    { ticker: 'WEBL', leverage: 3, asset: 'FDN' },
    { ticker: 'GDXU', leverage: 3, asset: 'GDX' },
    { ticker: 'BRZU', leverage: 2, asset: 'EWZ' },
    { ticker: 'DIG', leverage: 2, asset: 'XLE' },
    { ticker: 'BIB', leverage: 2, asset: 'IBB' },
    { ticker: 'EDC', leverage: 3, asset: 'EEM' },
    { ticker: 'TARK', leverage: 2, asset: 'ARKK' },
    { ticker: 'INDL', leverage: 2, asset: 'INDA' },
    { ticker: 'MIDU', leverage: 3, asset: 'IJH' },
    { ticker: 'MSFU', leverage: 1.5, asset: 'MSFT' },
    { ticker: 'CHAU', leverage: 2, asset: 'ASHR' },
    { ticker: 'AMZU', leverage: 1.5, asset: 'AMZN' },
    { ticker: 'MLPR', leverage: 1.5, asset: 'AMLP' },
    { ticker: 'GGLL', leverage: 1.5, asset: 'GOOGL' },
    { ticker: 'AAPU', leverage: 1.5, asset: 'AAPL' },
    { ticker: 'KORU', leverage: 3, asset: 'EWY' },
    { ticker: 'WANT', leverage: 3, asset: 'XLY' },
    { ticker: 'CLDL', leverage: 2, asset: 'SKYY' },
    { ticker: 'CONL', leverage: 1.5, asset: 'COIN' },
    { ticker: 'DUSL', leverage: 3, asset: 'XLI' },
    { ticker: 'EET', leverage: 2, asset: 'EEM' },
    { ticker: 'EFO', leverage: 2, asset: 'EFA' },
    { ticker: 'EURL', leverage: 3, asset: 'VGK' },
    { ticker: 'EZJ', leverage: 2, asset: 'EWJ' },
    { ticker: 'FBL', leverage: 1.5, asset: 'META' },
    { ticker: 'FNGG', leverage: 2, asset: {"DGCXX": 44.16, "NFLX": 5.91, "SNOW": 5.84, "MSFT": 5.80, "AAPL": 5.61, "AVGO": 5.58, "META": 5.52, "NVDA": 5.29, "AMZN": 5.19, "GOOGL": 4.98, "TSLA": 4.55, "FGTXX": 1.62} },
    { ticker: 'IWDL', leverage: 2, asset: 'IWD' },
    { ticker: 'IWFL', leverage: 2, asset: 'IWF' },
    { ticker: 'IWML', leverage: 3, asset: 'IWM' },
    { ticker: 'MEXX', leverage: 3, asset: 'EWW' },
    { ticker: 'MSOX', leverage: 2, asset: 'MSOS' },
    { ticker: 'PILL', leverage: 3, asset: 'PJP' },
    { ticker: 'SAA', leverage: 2, asset: 'IJR' },
    { ticker: 'TPOR', leverage: 3, asset: 'IYT' },
    { ticker: 'UBOT', leverage: 3, asset: 'BOTZ' },
    { ticker: 'UCC', leverage: 2, asset: 'XLY' },
    { ticker: 'UMDD', leverage: 3, asset: 'MDY' },
    { ticker: 'UPW', leverage: 2, asset: 'XLU' },
    { ticker: 'UXI', leverage: 2, asset: 'XLI' },
    { ticker: 'XPP', leverage: 2, asset: 'FXI' },
    { ticker: 'BNKU', leverage: 3, asset: 'KBE' }
];

// Define your helper functions (search, getStockData, etc.) here.
// These are the same functions used in your Express app.

async function search(name) {
    if (typeof name !== 'string' || !name) {
        console.error('Invalid input to search function');
        return null;
    }

    const tickerToFind = name.trim().toUpperCase();

    // Find the ETF data from the hardcoded array
    const etf = etfs.find(etf => etf.ticker.toUpperCase() === tickerToFind);
    if (etf) {
        return {
            ticker: etf.ticker,
            leverage: parseFloat(etf.leverage),
            asset: etf.asset, // Assuming asset is a string or object
        };
    }

    return null;
}

async function getStockData(stock, startDate, endDate) {
    try {
        const historicalData = await yahooFinance.historical(stock, {
            period1: new Date(startDate),
            period2: new Date(endDate)
        });

        const closePrices = historicalData.map(data => data.close);
        return closePrices;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function underlying(name, startDate, endDate, weight) {
    const closePrices = await getStockData(name, startDate, endDate);
    if (!closePrices || closePrices.length === 0) {
        return -401;
    }

    const startPrice = closePrices[0];
    const endPrice = closePrices[closePrices.length - 1];
    const returnPercentage = (endPrice - startPrice) / startPrice * 100;
    return returnPercentage * weight;
}

async function divergence(name, startDate, endDate, data) {
    let asset = 0;
    let etf = await underlying(name, startDate, endDate, 1);
    if (etf === -401) return -401;

    if (typeof data.asset === 'object') {
        for (const [stock, weight] of Object.entries(data.asset)) {
            const etfWeight = await underlying(stock, startDate, endDate, weight / 100);
            if (etfWeight === -401) return -401;
            asset += etfWeight;
        }
    } else {
        const assetName = data.asset;
        const etfWeight = await underlying(assetName, startDate, endDate, 1);
        if (etfWeight === -401) return -401;
        asset = etfWeight;
    }

    const leverage = data.leverage;
    return Math.abs(etf) - Math.abs(leverage * asset);
}

async function driver(stock, startDate, endDate) {
    
    try {

        const data = await search(stock);
        if (data) {
            return await divergence(stock, startDate, endDate, data);
        }
    } catch (error) {
        console.error(error);
        return -400;
    }
}

// The serverless function handler
module.exports = async (req, res) => {
    try {
        const { ticker, startDate, endDate } = req.body;

        if (!ticker || !startDate || !endDate) {
            return res.status(400).send('Missing required parameters');
        }

        const data = await driver(ticker, startDate, endDate);
        if (data !== null) {
            res.json(data);
        } else {
            res.status(404).send('Data not found');
        }
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).send('Server error');
    }
};
