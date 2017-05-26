import { SlickerThanSlackPage } from './app.po';

describe('slicker-than-slack App', () => {
  let page: SlickerThanSlackPage;

  beforeEach(() => {
    page = new SlickerThanSlackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
