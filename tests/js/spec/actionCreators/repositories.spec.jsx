import {getRepositories} from 'app/actionCreators/repositories';
import RepositoryActions from 'app/actions/repositoryActions';

describe('RepositoryActionCreator', function() {
  const api = new MockApiClient();
  const orgSlug = 'myOrg';

  const repoUrl = `/organizations/${orgSlug}/repos/`;
  const mockData = {id: '1'};

  beforeEach(() => {
    MockApiClient.clearMockResponses();
    jest.spyOn(RepositoryActions, 'loadRepos');
    jest.spyOn(RepositoryActions, 'loadReposSuccess');
  });

  afterEach(function() {
    jest.restoreAllMocks();
    MockApiClient.clearMockResponses();
  });

  it('fetch a Repository and emit an action', async () => {
    const mockResponse = MockApiClient.addMockResponse({
      url: repoUrl,
      body: mockData,
    });

    getRepositories(api, {orgSlug});
    await tick();

    expect(mockResponse).toHaveBeenCalledWith(repoUrl, expect.anything());
    expect(RepositoryActions.loadRepos).toHaveBeenCalledWith(orgSlug);
    expect(RepositoryActions.loadReposSuccess).toHaveBeenCalledWith(orgSlug, mockData);
  });
});
