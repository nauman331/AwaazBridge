export const COMMISSION_RATE = process.env.COMMISSION_RATE
    ? parseFloat(process.env.COMMISSION_RATE)
    : 0.1;

export const PLATFORM_PAYOUT_RATIO = process.env.PLATFORM_PAYOUT_RATIO
    ? parseFloat(process.env.PLATFORM_PAYOUT_RATIO)
    : 0.7;

export function calculateCommission(notional: number, rate = COMMISSION_RATE) {
    return +(notional * rate);
}

export function calculateNetForBuy(amount: number, price: number, commissionRate = COMMISSION_RATE) {
    const notional = amount * price;
    const fee = calculateCommission(notional, commissionRate);
    return { notional, fee, totalDeduct: +(notional + fee) };
}

export function calculateNetForSell(amount: number, price: number, commissionRate = COMMISSION_RATE, payoutRatio = PLATFORM_PAYOUT_RATIO) {
    const notional = amount * price;
    const fee = calculateCommission(notional, commissionRate);
    const netReceive = +(notional - fee);


    const adjustedReceive = +(netReceive * payoutRatio);
    return { notional, fee, netReceive, adjustedReceive };
}