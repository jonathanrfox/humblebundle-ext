import _ from 'lodash';
import path from 'path';
import shortid from 'shortid';


shortid.characters('йцукенгшщзфывапролджэхъячсмитьбюЙЦУКЕНГШЩЗФЫВАПРОЛДЖЭХЪЯЧСМИТЬБЮ');

const getFormat = (x) => {
    // videos have a name of 'Download', let's change it to zip
    return x === 'Download' ? 'zip' : x.toLowerCase();
};

const restructureDownloads =
      (outputBaseDir) =>
      ({ machine_name: productName, downloads: downloadArray }) => {
    // downloads is always an array with a single element
    const { platform, download_struct: downloads } = downloadArray[0];
    const products = downloads.map(download => {
        const format = getFormat(download.name);
        const filename = `${productName}.${format}`;
        const filepath = path.join(outputBaseDir, platform, format, filename);
        const url = download.url.web;
        const filesize = download.file_size;
        const md5 = download.md5;
        return { format, filepath, url, filesize, md5 };
    });
    const availableFormats = _.map(products, 'format').sort().join('');
    return { platform, products, availableFormats };
};

const parse = ({ product, subproducts }) => {
    const { human_name: bundleName, machine_name: cleanBundleName } = product;
    return {
        bundleName,
        categories: _(subproducts)
            .filter(x => x.downloads.length > 0)
            .map(restructureDownloads(cleanBundleName))
            .groupBy(o => `${o.platform}_${o.availableFormats}`)
            .mapValues((values, key) => {
                const [ platform, availableFormats ] = key.split('_');
                const count = values.length;
                const productGroups = _(values)
                      .map('products')
                      .flatten()
                      .groupBy('format')
                      .mapValues(products => ({
                          id: shortid.generate(),
                          totalFileSize: _.sumBy(products, 'filesize'),
                          products
                      }))
                      .value()
                return { platform, count, productGroups };
            })
            .value()
    };
};

export default { parse };
