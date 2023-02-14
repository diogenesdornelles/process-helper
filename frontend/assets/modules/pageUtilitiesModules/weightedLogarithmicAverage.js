export default function weightedLogarithmicAverage (noiseMeasurements, exposureTimes) {
  let numerator = 0
  let denominator = 0

  for (let i = 0; i < noiseMeasurements.length; i++) {
    numerator += Math.pow(10, noiseMeasurements[i] / 10) * exposureTimes[i]
    denominator += exposureTimes[i]
  }

  return (10 * Math.log10(numerator / denominator)).toFixed(2)
}
