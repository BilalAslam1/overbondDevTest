# Coding Challenge

To execute the program:

- Install node on your machine
- Run npm install to get all the node modules
- Run node index.js to get the results

## Thought Process for Challenge 1

I noticed the sample input was sorted by term for corporate bonds and government bonds. Assuming the file was always sorted, I decided to use binary search to find the closest government bond based on term for a given corporate bond. This meant I needed to converted the government bond years to an array for computation. I prioritized time complexitity over space as in a financial buisness time complexity would matter more. I could have used a brute force approach for better space complexity but that would have added to the time complexity.

### Sample Output

```
'bond','benchmark','spread_to_benchmark',
[ 'C1', 'G1', '1.60' ],
[ 'C2', 'G2', '1.50' ],
[ 'C3', 'G3', '2.00' ],
[ 'C4', 'G3', '2.90' ],
[ 'C5', 'G4', '0.90' ],
[ 'C6', 'G5', '1.80' ],
[ 'C7', 'G6', '2.50' ]
```

## Thought Process for Challenge 2

If you have the closest government bond term to the corporate bond term. Then finding the 2 closest government bond terms such that the first one is smaller than corporate bond term and the second one is larger is straightforward. This is because the array is sorted already and thus the 2 terms would be consecutive. Hence, this challenge is built up of the last one. Therefore, I decided to pass that information about the closest government bond term for each corporate bond in an array to the main function and then into calculateSpreadToCurve as a parameter. This was done to avoid doing the same calculation again. As in a full scale envrionment you would want to avoid that at all costs especially for it to scale well. However, it might have made the code harder to read.

Using the closest array the smaller and larger government bond were found and that information used in the interpolation formuala to find the corresponding government bond yield. This was substracted from the corporate bond yield to find spread to curve.

### Sample Output

```
'bond','spread_to_curve',
  [ 'C1', '1.43' ],
  [ 'C2', '1.63' ],
  [ 'C3', '2.47' ],
  [ 'C4', '2.27' ],
  [ 'C5', '1.90' ],
  [ 'C6', '1.57' ],
  [ 'C7', '2.83' ]
```

## Technical Choices

- I decided to use node.js as I'm familiar with it. Also, it has a lot of npm packages available include neat-csv which I used to read the data.
- Neat csv package is a small and fast csv parser. Thus, it wouldn't hinder the performance of the application
- I used async functions as they'd be better in a production environment. Also, because I use computations from Challenge1 in Challenge2

### Additional Functionalities

- Create a GUI to be able to better understand the data
- Create more thorough automated tests
- More thorough edge cases as well
- Further compartmentilization as project grows. Not having all functions in one index.js file
