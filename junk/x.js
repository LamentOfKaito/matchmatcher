/**
 * @returns Size of the resource in bytes (content-length).
 */
async function getSize(url) {
    return await axios
        .head(url)
        .then(res => res.headers['content-length'])
        .then(Number);
}

function prettyFilesize(bytes) {
    throw 'unimplemented exception';
}

useEffect(async function fetchDataSize() {
    const lightDataUrl = './data.light.json';
    const size = await getSize(lightDataUrl)
    store.set(size)
}, []);

const sizeText = dataSize ? prettyFilesize(size) : 'unknown size';
<ButtonTimed timeout={5} action={fetchFile}>
    Load all data
    ({sizeText})
</ButtonTimed>


async function getAny(url, onProgress = function() {}) {
    const res = await axios({
        url: sUrl,
        method: 'GET',
        responseType: 'blob', // important
        onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress({percentCompleted, progressEvent})
        }
    });
    
    return res;
}
