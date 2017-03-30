import { SeeUnitCoveragePage } from './app.po';

describe('see-unit-coverage App', () => {
  let page: SeeUnitCoveragePage;

  beforeEach(() => {
    page = new SeeUnitCoveragePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
