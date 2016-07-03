import validator from '../../../../src/models/validators/latitude';

describe('models:validators:latitude', () => {
  it('should be invalid if degrees is less than -90', () => {
    expect(validator(-91)).to.be.false;
  });

  it('should be invalid if degrees is bigger than 90', () => {
    expect(validator(91)).to.be.false;
  });

  it('should be valid if degrees is -90', () => {
    expect(validator(-90)).to.be.true;
  });

  it('should be valid if degrees is 90', () => {
    expect(validator(90)).to.be.true;
  });

  it('should be valid if degrees is between -90 and 90', () => {
    expect(validator(1)).to.be.true;
  });
});
