import { add } from './utils';

describe('add', () => {
  it('should return 3 if 1= 1, b=2', () => {
    const inputA = 1;
    const inputB = 2;
    expect(add(inputA, inputB)).toEqual(3);
  });
});
