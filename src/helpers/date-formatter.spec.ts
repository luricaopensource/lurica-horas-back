import { DateFormatter } from './date-formatter';

describe('DateFormatter - Fecha de hoy', () => {

  it('should format today\'s date as 23/09/2024', () => {
    const today = new Date();

    jest.spyOn(global, 'Date').mockImplementation(() => today);

    const formattedDate = DateFormatter.getDDMMYYYY(new Date());

    expect(formattedDate).toBe('23/09/2024');

    jest.restoreAllMocks();
  });

});