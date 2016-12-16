import { PolluvizPage } from './app.po';

describe('polluviz App', function() {
  let page: PolluvizPage;

  beforeEach(() => {
    page = new PolluvizPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
