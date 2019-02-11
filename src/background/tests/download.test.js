import { download, pollDownloadState } from '../../browser';
import { sleep } from '../../utils';
import { InputStorage } from '../storage';
import { handleDownload } from '../download'


jest.mock('../storage');
jest.mock('../../browser');
jest.mock('../../utils');

beforeEach(() => {
    jest.clearAllMocks();
});

test('handleDownload calls download with files in payload', async () => {
    download.mockResolvedValue('abc')
    pollDownloadState.mockResolvedValue();
    await handleDownload({
        payload: [{
            url: 'some/url',
            filepath: 'path/to/file'
        }]
    })
    expect(download).toHaveBeenCalledWith('some/url', 'path/to/file');
    expect(pollDownloadState).toHaveBeenCalledWith('abc');
    expect(InputStorage.clear).toHaveBeenCalled();
});
