const { testCorporateData, testGovernmentData, closestGovtYearData, testGovernmentYearData } = require("./testConstants.js");
const { calculateSpreadToBenchmark, getBestGovtBenchmark, calculateSpreadToCurve } = require("./index.js");

describe('calculateSpreadToCurve', () => {
    it('returns the right spread to curve', async () => {
        const response = await calculateSpreadToCurve(closestGovtYearData, testCorporateData[0], testGovernmentData);
        expect(response).toEqual(['bond', 'spread_to_curve', ['C1', 1.22]]);
    })
});

describe('getBestGovtBenchmark', () => {
    it('returns the closest government bond terms index ', async () => {
        const response = await getBestGovtBenchmark(testCorporateData[0], testGovernmentYearData);
        expect(response).toEqual(testGovernmentData[0]);
    })
});

describe('calculateSpreadToBenchmark', () => {
    it('return correct yield spread for challenge1 and closest govt bond term index', async () => {
        const response = await calculateSpreadToBenchmark(testCorporateData[0], testGovernmentData[0]);
        expect(response).toEqual(['bond', 'benchmark', 'spread_to_benchmark', ['C1', 'G1', 1.60]][0]);
    })
});


