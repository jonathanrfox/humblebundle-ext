import parser from '../parser';

import dummy from './dummy.json';
import expected from './expected.json';


test('parses data into more manageable form', () => {
    const parsed = parser.parse(dummy);

    expect(parsed.bundlename).toBe(expected.bundlename);

    let ebook = parsed.platforms.ebook[0];
    expect(ebook.meta).toEqual([
        {
            "format": "epub",
            "totalFileSize": 238308005,
            "id": expect.any(String)
        },
        {
            "format": "mobi",
            "totalFileSize": 453860243,
            "id": expect.any(String)
        },
        {
            "format": "pdf",
            "totalFileSize": 238509497,
            "id": expect.any(String)
        }
    ]);
    let ebookMatchObj = {
        "fileSize": expect.any(Number),
        "md5": expect.any(String),
        "url": expect.any(String),
        "platform": "ebook",
        "format": expect.stringMatching(/(epub|mobi|pdf)/),
        "name": expect.any(String),
        "fileName": expect.any(String)
    };
    let ebookMatchArr = Array.from(new Array(ebook.products.length), () => Object.assign({}, ebookMatchObj));
    expect(ebook.products).toMatchObject(ebookMatchArr);

    let video = parsed.platforms.video[0];
    expect(video.meta).toEqual([
        {
            "format": "zip",
            "totalFileSize": 3492859133,
            "id": expect.any(String)
        }
    ]);
    let videoMatchObj = {
        "fileSize": expect.any(Number),
        "md5": expect.any(String),
        "url": expect.any(String),
        "platform": "video",
        "format": "zip",
        "name": expect.any(String),
        "fileName": expect.any(String)
    };
    let videoMatchArr = Array.from(new Array(video.products.length), () => Object.assign({}, videoMatchObj));
    expect(video.products).toMatchObject(videoMatchArr);
});
