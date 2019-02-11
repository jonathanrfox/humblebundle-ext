import { download, pollDownloadState } from '../browser';
import { InputStorage } from './storage';


export const handleDownload = async ({ payload }) => {
    for (const { url, filepath } of payload) {
        try {
            const id = await download(url, filepath);
            await pollDownloadState(id);
        } catch (e) {
            console.error(e.message);
        }
    }
    InputStorage.clear();
};
