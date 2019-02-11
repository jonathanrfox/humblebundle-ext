import parser from '../parser';
import unparsed from './unparsed_data.json';


const ebookMatchObj = {
    format: expect.stringMatching(/(epub|mobi|pdf)/),
    filepath: expect.any(String),
    filesize: expect.any(Number),
    url: expect.any(String),
    md5: expect.any(String)
};

const videoMatchObj = {
    ...ebookMatchObj,
    format: 'zip'
};

test('parses json data', () => {
    const parsed = parser.parse(unparsed);
    expect(parsed.bundleName).toBe("Humble Book Bundle: Python by Packt");
    const { ebook_epubmobipdf, video_zip } = parsed.categories;

    expect(ebook_epubmobipdf.count).toBe(18)
    expect(ebook_epubmobipdf.platform).toBe('ebook');
    expect(video_zip.count).toBe(6);
    expect(video_zip.platform).toBe('video');

    const { epub, mobi, pdf } = ebook_epubmobipdf.productGroups;

    expect(epub.id).toEqual(expect.any(String));
    expect(epub.totalFileSize).toBe(238308005);
    epub.products.forEach(product => {
        expect(product).toMatchObject(ebookMatchObj);
    });

    expect(mobi.id).toEqual(expect.any(String));
    expect(mobi.totalFileSize).toBe(453860243);
    mobi.products.forEach(product => {
        expect(product).toMatchObject(ebookMatchObj);
    });

    expect(pdf.id).toEqual(expect.any(String));
    expect(pdf.totalFileSize).toBe(238509497);
    pdf.products.forEach(product => {
        expect(product).toMatchObject(ebookMatchObj);
    });

    const { zip } = video_zip.productGroups;

    expect(zip.id).toEqual(expect.any(String));
    expect(zip.totalFileSize).toBe(3492859133);
    zip.products.forEach(product => {
        expect(product).toMatchObject(videoMatchObj);
    });
});
