import etfs from '../src/etfs';

const yahooFinance = require('yahoo-finance2').default;


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
