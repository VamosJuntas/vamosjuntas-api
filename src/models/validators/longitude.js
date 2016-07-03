const MAX_DEGREES = 180;
const MIN_DEGREES = -180;

export default function(longitude) {
  return longitude >= MIN_DEGREES && longitude <= MAX_DEGREES;
}

