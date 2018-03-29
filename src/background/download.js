import path from 'path';

import { download, getDownloadState } from '../browser';
import { InputStorage } from './storage';


function *genDownloads({ data, form, machine_name }) {
    for (const groupArr of Object.values(data)) {
        for (const { meta, products } of groupArr) {
            const selected = meta.filter(({ id }) => form[id]);
            const formats = new Set(selected.map(x => x.format));
            const filtered = products.filter(p => formats.has(p.format));
            for (const { url, platform, format, filename } of filtered) {
                const filepath = path.join(machine_name, platform, format, filename);
                yield { url, filepath };
            }
        }
    }
}

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}

function pollDownloadState(id) {
    return new Promise(async (resolve) => {
        while (true) {
            const state = await getDownloadState(id);
            if (state === "complete") {
                resolve(true);
                break;
            } else if (state === "interrupted") {
                resolve(false);
                break;
            } else {
                await sleep(1);
            }
        }
    });
}

export async function handleDownload({ payload }) {
    const downloads = [...genDownloads(payload)];

    for (let { url, filepath: filename } of downloads) {
        try {
            if (process.env.NODE_ENV !== 'production') {
                url = `http://localhost:5000/humbundlr/file/${filename}`;
            }
            console.log(url);
            const id = await download(url, filename);
            await pollDownloadState(id);
        } catch (e) {
            console.error(e.message);
        }
    }

    InputStorage.clear();
}
