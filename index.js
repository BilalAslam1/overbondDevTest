// Import to read data
const fs = require("fs");
const neatCsv = require("neat-csv");

const sampleData = fs.readFileSync("./sample_input.csv");
const inputData = async () => await neatCsv(sampleData);

const main = async () => {
    const data = await inputData();
    const corporateBonds = data.filter(x => x.type === 'corporate');
    const governmentBonds = data.filter(x => x.type === 'government');

    var challenge1 = await calculateSpreadToBenchmark(corporateBonds, governmentBonds);
    console.log(challenge1.output);

    // pass cloeset government benchmark from challenge 1 to avoid repeating same calculation
    var challenge2 = await calculateSpreadToCurve(challenge1.cloesetArr, corporateBonds, governmentBonds);
    console.log(challenge2);
};

main();

const calculateSpreadToBenchmark = async (corporateBonds, governmentBonds) => {

    if (!corporateBonds || !governmentBonds) {
        return 'arguments not defined'
    }

    const output = ["bond", "benchmark", "spread_to_benchmark"];
    let cloesetArr = [];

    // covert government years to an array
    var govtYearsArray = [];
    governmentBonds.forEach(x => {
        govtYearsArray.push(Number(x.term.replace("years", "")));
    });

    corporateBonds.forEach((i) => {
        let corporateBondYear = Number(i.term.replace("years", ""));
        const bestGovtBenchmark = await getBestGovtBenchmark(corporateBondYear, govtYearsArray);
        const bestBenchmarkSpread = Math.abs(Number(governmentBonds[bestGovtBenchmark].yield.replace("%", "")) - Number(i.yield.replace("%", "")));
        output.push([i.bond, governmentBonds[bestGovtBenchmark].bond, bestBenchmarkSpread.toFixed(2)]);
        cloesetArr.push(bestGovtBenchmark);
    });

    // pass results of closeset government bond index back as well 
    return {
        output,
        cloesetArr
    };
};

// Returns closest Government Bond Term index based on corporate bond term 
const getBestGovtBenchmark = async (corporateBondYear, governmentBondsYearsArr) => {
    if (!corporateBondYear || !governmentBondsYearsArr) {
        return 'arguments not defined'
    }

    let left = 0;
    let right = governmentBondsYearsArr.length - 1;

    while (left < right) {
        let mid = left + Math.floor((right - left) / 2);

        if (corporateBondYear - governmentBondsYearsArr[mid] > governmentBondsYearsArr[mid + 1] - corporateBondYear) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left
}


const calculateSpreadToCurve = async (closestArr, corporateBonds, governmentBonds) => {

    if (!corporateBonds || !governmentBonds || !closestArr) {
        return 'arguments not defined'
    }

    const output = ['bond', 'spread_to_curve'];

    let i = 0;
    corporateBonds.forEach(x => {

        const corporateBondYear = Number(x.term.replace("years", ""));

        if (Number(governmentBonds[closestArr[i]].term.replace("years", "")) > corporateBondYear) {
            var x1 = Number(governmentBonds[closestArr[i - 1]].term.replace("years", ""));
            var x2 = Number(governmentBonds[closestArr[i]].term.replace("years", ""));

            var y1 = Number(governmentBonds[closestArr[i - 1]].yield.replace("%", ""));
            var y2 = Number(governmentBonds[closestArr[i]].yield.replace("%", ""));
        }
        else {
            var x1 = Number(governmentBonds[closestArr[i]].term.replace("years", ""));
            var x2 = Number(governmentBonds[closestArr[i] + 1].term.replace("years", ""));

            var y1 = Number(governmentBonds[closestArr[i]].yield.replace("%", ""));
            var y2 = Number(governmentBonds[closestArr[i + 1]].yield.replace("%", ""));
        }

        const slope = (y2 - y1) / (x2 - x1);

        const governmentYield = slope * (corporateBondYear - x1) + (y1);
        const corporateBondYield = Number(x.yield.replace("%", ""))

        const spreadToCurve = corporateBondYield - governmentYield;
        output.push([x.bond, spreadToCurve.toFixed(2)])

        i++;
    })

    return output;
}