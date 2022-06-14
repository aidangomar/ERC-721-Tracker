import requests
import csv
import json
import sys

def init():
    f = open('../../config.json', "r")
    config = json.load(f)

    global etherscan_api_key
    etherscan_api_key = config['ETHERSCAN_API_KEY']

    f.close()


def get_addr_data(addr):
    url = 'https://api.etherscan.io/api' + \
        '?module=account' + \
        '&action=tokennfttx' + \
        '&address=' + addr + \
        '&startblock=0' + \
        '&endblock=99999999' + \
        '&sort=asc' + \
        '&apikey=' + etherscan_api_key

    response = requests.get(url)
    data = response.json()
    if data['message'] != "OK":
        print("Error: " + data['message'])
        #raise Exception('100 percent api issue not mine')
    # data contains: status ;; message (api key status) ;; result (list of transactions)
    return data


def dump_txns_to_json(addr):
    data = get_addr_data(addr)
    results = data['result']
    dataset = {}
    # maybe also include gas price if that doesn't show up in the web3.js module
    for result in results:
        uniqueID = result['tokenID'] + ' - ' + result['tokenName']
        data = {"hash": result['hash'], "to": result['to'], "result": result['from'],  
                'contractAddress': result['contractAddress'], "gasCost": str(int(result['gasPrice']) * int(result['gasUsed'])), 
                'timeStamp': result['timeStamp'], 'value': 'null'}
        if uniqueID in dataset:
            dataset[uniqueID].append(data)
        else:
            dataset[uniqueID] = [data]

    with open('../data/nft_txns.json', 'w') as outfile:
        json.dump(dataset, outfile)
    
if __name__ == '__main__':
    init()
    dump_txns_to_json(str(sys.argv[1]))