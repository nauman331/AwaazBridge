export const PLATFORM_PAYOUT_RATIO = process.env.PLATFORM_PAYOUT_RATIO
    ? parseFloat(process.env.PLATFORM_PAYOUT_RATIO)
    : 0.7;

// Binary options specific calculations
export function calculateBinaryOptionsPayout(stakeAmount: number, payoutRatio: number = PLATFORM_PAYOUT_RATIO, isWin: boolean = false) {
    if (!isWin) {
        return {
            payout: 0,
            profit: -stakeAmount, // User loses their stake
            platformProfit: stakeAmount
        };
    }

    const profit = Number(stakeAmount * payoutRatio);
    const totalPayout = Number(stakeAmount + profit); // Return stake + profit
    const platformLoss = Number(profit); // Platform pays out the profit

    return {
        payout: totalPayout,
        profit: profit,
        platformProfit: -platformLoss // Negative because platform pays out
    };
}