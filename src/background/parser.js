import _ from 'lodash';
import shortid from 'shortid';


shortid.characters('йцукенгшщзфывапролджэхъячсмитьбюЙЦУКЕНГШЩЗФЫВАПРОЛДЖЭХЪЯЧСМИТЬБЮ');

function reshapeDownload({ filename, platform, name, md5, file_size, url }) {
    let format = name === 'Download' ? 'zip' : name.toLowerCase();
    return {
        filename: `${filename}.${format}`,
        name: filename,
        url: url.web,
        fileSize: file_size,
        format,
        platform,
        md5
    };
}

const reshapeProduct = ({
    machine_name: filename,
    downloads: [{
        platform,
        download_struct: dl_s
    }]
}) => ({
    platform,
    downloads: dl_s.map(dl => reshapeDownload({ platform, filename, ...dl }))
});

function joinFormatKey({ downloads }) {
    return _.map(downloads, 'format').sort().join();
}

function fileSizeReducer(acc, { downloads }) {
    for (const { format, fileSize } of downloads)
        acc[format].totalFileSize += fileSize;
    return acc;
}

function metaReducer(acc, format) {
    acc[format] = {
        id: shortid.generate(),
        totalFileSize: 0,
        format
    };
    return acc;
}

function reshapeFormatGroups(group, joinedFormats) {
    let metaInit = joinedFormats.split(',').reduce(metaReducer, {});
    let meta = group.reduce(fileSizeReducer, metaInit);

    return {
        products: _(group)
            .map('downloads')
            .flatten()
            .value(),
        meta: Object.values(meta)
    };
}

const reshapePlatformValue = value => _(value)
    .groupBy(joinFormatKey)
    .map(reshapeFormatGroups)
    .value();

const parse = ({
    product: { human_name, machine_name },
    subproducts: products
}) => ({
    machine_name,
    human_name,
    platforms: _(products)
        .filter(product => product.downloads.length > 0)
        .map(reshapeProduct)
        .groupBy('platform')
        .mapValues(reshapePlatformValue)
        .value()
});

export default { parse };
