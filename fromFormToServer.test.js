const fromFormToServer = require('./fromFormToServer');

describe("fromFormToServer", () => {
  it('Отечественный юридическоий контрагент', () => {
    expect(
      fromFormToServer({
        isForeign: false,
        isJuridical: true,
        title: 'Компания ВК',
        tin: '1234567890',
      })
    ).toEqual({
      type: 'juridical',
      tin: '1234567890',
      name: null,
      foreign_tin: null,
      company_title: 'Компания ВК',
    });
  });

  it('Отечественный физический контрагент', () => {
    expect(
      fromFormToServer({
        isForeign: false,
        isJuridical: false,
        title: 'Леонид Яшков',
        tin: '0987654321',
      })
    ).toEqual({
      type: 'physical',
      tin: '0987654321',
      name: 'Леонид Яшков',
      foreign_tin: null,
      company_title: null,
    });
  });

  it('Иностранный юридический контрагент', () => {
    expect(
      fromFormToServer({
        isForeign: true,
        isJuridical: true,
        title: 'Facebook',
        tin: '111222333',
      })
    ).toEqual({
      type: 'foreign_juridical',
      tin: null,
      name: null,
      foreign_tin: '111222333',
      company_title: 'Facebook',
    });
  });

  it('Иностранный физический контрагент', () => {
    expect(
      fromFormToServer({
        isForeign: true,
        isJuridical: false,
        title: 'Ryan Gosling',
        tin: '333222111',
      })
    ).toEqual({
      type: 'foreign_physical',
      tin: null,
      name: 'Ryan Gosling',
      foreign_tin: '333222111',
      company_title: null,
    });
  });

  it('Незаполненные поля', () => {
    expect(
      fromFormToServer({
        isForeign: false,
        isJuridical: false,
        title: null,
        tin: null,
      })
    ).toEqual({
      type: 'physical',
      tin: null,
      name: null,
      foreign_tin: null,
      company_title: null,
    });
  });
});