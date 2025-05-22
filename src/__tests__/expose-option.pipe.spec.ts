import { ExposeOptionPipe } from 'src/common/pipes/expose-option.pipe';

describe('ExposeOptionPipe', () => {
  let pipe: ExposeOptionPipe;

  beforeEach(() => {
    pipe = new ExposeOptionPipe();
  });

  it('should transform an array of objects with id and name', () => {
    const input = [
      { id: 1, name: 'Test', extra: 'ignored' },
      { id: 2, name: 'Other', extra: 'ignored' },
    ];

    const result = pipe.transform(input);

    expect(result).toEqual([
      { id: 1, name: 'Test' },
      { id: 2, name: 'Other' },
    ]);
  });

  it('should transform a single object with id and name', () => {
    const input = { id: 5, name: 'One', extra: 'ignored' };
    const result = pipe.transform(input);
    expect(result).toEqual({ id: 5, name: 'One' });
  });

  it('should return undefined for null or undefined', () => {
    expect(pipe.transform(undefined)).toBeUndefined();
    expect(pipe.transform(null)).toBeNull();
  });
});
