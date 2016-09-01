export default function(value) {
  if (!value) {
    return undefined;
  }

  if (typeof value !== 'string') {
    return undefined;
  }

  const point = value.split(',');

  if (point.length < 2) {
    return undefined;
  }

  if (point[0] === '' || point[1] === '') {
    return undefined;
  }

  const latitude = Number(point[0].trim());
  const longitude = Number(point[1].trim());

  return [latitude, longitude];
}
