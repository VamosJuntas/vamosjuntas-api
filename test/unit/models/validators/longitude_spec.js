import validator from '../../../../src/models/validators/longitude';

describe('models:validators:longitude', () => {
  it('should be invalid if degrees is less than -180', () => {
    expect(validator(-181)).to.be.false;
  });

  it('should be invalid if degrees is bigger than 180', () => {
    expect(validator(181)).to.be.false;
  });

  it('should be valid if degrees is -180', () => {
    expect(validator(-180)).to.be.true;
  });

  it('should be valid if degrees is 180', () => {
    expect(validator(180)).to.be.true;
  });

  it('should be valid if degrees is between -180 and 180', () => {
    expect(validator(1)).to.be.true;
  });
});
