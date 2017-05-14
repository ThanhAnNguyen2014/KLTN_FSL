import { UserIoPage } from './app.po';

describe('user-io App', () => {
  let page: UserIoPage;

  beforeEach(() => {
    page = new UserIoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
