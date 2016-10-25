import parser from '../../../src/libs/parse_geolocation';

describe('libs:parse_geolocation', () => {
  it('should explode geolocation string', () => {
    expect(parser('-30.057389,-51.174544')).to.eql([-30.057389, -51.174544]);
  });

  it('should parse even with space after comma', () => {
    expect(parser(' -30.057389, -51.174544')).to.eql([-30.057389, -51.174544]);
  });

  it('should return an array', () => {
    expect(parser('-30.057389,-51.174544')).to.be.instanceof(Array);
  });

  it('should return undefined in both values if latitude fails', () => {
    expect(parser(',-51.174544')).to.be.an('undefined');
  });

  it('should return undefined in both values if longitute fails', () => {
    expect(parser('-30.057389,')).to.be.an('undefined');
  });

  it('should return undefined if none passed', () => {
    expect(parser()).to.be.an('undefined');
  });

  it('should return undefined if a string isn\'t passed', () => {
    expect(parser(123)).to.be.an('undefined');
  });

  it('should return undefined if string contains no number values', () => {
    expect(parser('whatever')).to.be.undefined;
  });

  it('should return undefined if string contains invalid values', () => {
    expect(parser('Something,Something')).to.be.undefined;
  });

});
