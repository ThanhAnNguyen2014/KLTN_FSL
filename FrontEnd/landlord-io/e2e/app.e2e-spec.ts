import { TestMapPage } from './app.po';

describe('test-map App', () => {
  let page: TestMapPage;

  beforeEach(() => {
    page = new TestMapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
