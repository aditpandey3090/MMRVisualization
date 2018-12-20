import { DataAnalysisToolPage } from './app.po';

describe('data-analysis-tool App', () => {
  let page: DataAnalysisToolPage;

  beforeEach(() => {
    page = new DataAnalysisToolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
