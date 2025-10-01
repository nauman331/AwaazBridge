export const getCoinPrice = async (coin: string): Promise<number> => {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
        const data = await response.json();
        return data[coin]?.usd;
    } catch (error) {
        console.error(`Error fetching price for ${coin}:`, error);
        throw error;
    }
}