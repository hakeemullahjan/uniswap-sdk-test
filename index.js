const { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType } = require ('@uniswap/sdk');
const ethers = require('ethers');  

const url = '';

const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

const chainId = ChainId.MAINNET;
const tokenAddress = '0x38A2fDc11f526Ddd5a607C1F251C065f40fBF2f7'

const init = async () => {
	const dai = await Fetcher.fetchTokenData(chainId, tokenAddress, customHttpProvider);
	const weth = WETH[chainId];
	const pair = await Fetcher.fetchPairData(dai, weth, customHttpProvider);
	const route = new Route([pair], weth);
	const trade = new Trade(route, new TokenAmount(weth, '100000000000000000'), TradeType.EXACT_INPUT);
	console.log("Mid Price WETH --> DAI:", route.midPrice.toSignificant(6));
	console.log("Mid Price DAI --> WETH:", route.midPrice.invert().toSignificant(6));
	console.log("-".repeat(45));
	console.log("Execution Price WETH --> DAI:", trade.executionPrice.toSignificant(6));
	console.log("Mid Price after trade WETH --> DAI:", trade.nextMidPrice.toSignificant(6));
}

init();