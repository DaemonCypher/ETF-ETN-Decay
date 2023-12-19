import json
import yfinance as yf
import pandas as pd

def search(name):
    """
        Searches the stock name through etf.txt 
        and if found return the line in txt file as an dict
        else return none

    Args:
        name (str): Stock name
    Returns:
        dict: dictionary of stock name, its leverage, and underlying assets
    """
    ticker_to_find = name.strip().upper()

    with open("etf.txt", 'r') as file:
        for line in file:
            parts = line.split(';')
            ticker = parts[0].strip()

            if ticker == ticker_to_find:
                leverage = float(parts[1].strip())

                # Parse the asset as JSON if possible, otherwise keep it as a string
                asset_str = parts[2].strip()
                try:
                    asset = json.loads(asset_str)
                except json.JSONDecodeError:
                    asset = asset_str

                # Returning the found data
                return {"ticker": ticker, "leverage": leverage, "asset": asset}
        
        # If ticker not found in the file, return error
        return None
        
def divergence(name,start_date,end_date,data):
    """
        Calculate the divergence of the leverage ETF/ETN and its
        underlying asset

    Args:
        name (str): stock name
        start_date (str): start date to grab data
        end_date (str): end date to stop grabbing data
        data (_type_): data about the underlying asset and the leverage

    Returns:
        result (float): Divergence between leverage ETF/ETN and its underlying asset
    """
    asset = 0
    etf_weight = 0
    # for leverage etf no need to calculate the weight of it
    etf = underlying(name,start_date,end_date,1)
    
   
    if isinstance(data["asset"],dict):
    
        for stock, weight in data["asset"].items():
            # for etf/etn that have underlying asset that make up the
            # percent of the etf (i.e. FNGU)
            etf_weight = underlying(stock,start_date,end_date,weight/100)
            if etf_weight == -401:
                return -401
            else:
                asset = asset + etf_weight
    else:
        asset_name = data["asset"]
        etf_weight = underlying(asset_name,start_date,end_date,1)
        
        if etf_weight == -401:
            return -401
        else:
            asset = etf_weight
        
    leverage = data["leverage"]
    result = abs(etf) - abs((leverage* asset))
    return result
    
def underlying(name,start_date,end_date,weight):
    """ Calculates the weight of the stock

    Args:
        name (str): stock name
        start_date (str): start date to grab data
        end_date (str): end date to stop grabbing data
        weight (float): weight of the asset

    Returns:
        weighted_return (float): calculated weight
    """
    stock = yf.Ticker(name)
    df = stock.history(start=start_date, end=end_date) 
    df.drop(['Dividends', 'Stock Splits','Open','High','Low','Volume'], axis=1, inplace=True)
    df['Date'] = df.index

    if df.empty or 'Close' not in df:
        return -401
    # Drop the Date as index
    df.reset_index(drop=True, inplace=True)
    start_price = df['Close'][0]
    length = len(df['Close'])
    end_price = df['Close'][length-1]
    return_percentage = (end_price - start_price) / start_price * 100
    weighted_return = return_percentage * weight
    return weighted_return

def driver(stock,start_date,end_date):
    try:
        data = search(stock)
        if data:
            return divergence(stock, start_date, end_date, data)

    except KeyError:
        return -400



#stock="FNGU"
# use try and except to see if the etf name is in the etf_data
# if not .get() should return an error
#decay_data = driver(stock, '2022-01-01', '2022-12-31')
#print(decay_data)