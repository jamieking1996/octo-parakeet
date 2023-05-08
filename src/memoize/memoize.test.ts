import memoize from './memoize';

it('Should return a function with the same type signature as the input function', () => {
  const add = (a: number, b: number) => a + b;
  const memoizedAdd = memoize(add);
  expect(typeof memoizedAdd).toBe('function');
  expect(memoizedAdd(1, 2)).toBe(3);
});

test('Memoized function should called cache result, meaning function is onyl called once', () => {
  const add = jest.fn((a: number, b: number) => a + b);;
  const memoizedAdd = memoize(add);
  memoizedAdd(1, 2);
  memoizedAdd(1, 2);
  expect(add).toBeCalledTimes(1);
});