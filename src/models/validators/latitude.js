const MAX_DEGREES = 90;
const MIN_DEGREES = -90;

export default function(latitude) {
  return latitude >= MIN_DEGREES && latitude <= MAX_DEGREES;
}
