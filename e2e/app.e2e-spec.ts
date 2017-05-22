import { XebiaPage } from './app.po';

describe('xebia App', () => {
  let page: XebiaPage;

  beforeEach(() => {
    page = new XebiaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
