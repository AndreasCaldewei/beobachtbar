import { Observable } from '../src';

describe('index', () => {
  describe('myPackage', () => {
    it('should return a string containing the message', () => {
      const message = 'Hello';

      const result = new Observable(message);

      expect(result.value).toMatch(message);
    });
  });
});
