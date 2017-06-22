import { BlogsterUiPage } from './app.po';

describe('blogster-ui App', () => {
  let page: BlogsterUiPage;

  beforeEach(() => {
    page = new BlogsterUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
