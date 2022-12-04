export const getImageSizes = async (file) =>
    new Promise((resolve) => {
        const img = new Image();
        const sizes = {
            width: 0,
            height: 0,
        };

        img.addEventListener('load', function imageLoad() {
            sizes.width = img.width;
            sizes.height = img.height;

            resolve(sizes);
            window.removeEventListener('load', imageLoad);
        });

        img.addEventListener('error', function imageLoadError() {
            resolve(sizes);
            window.removeEventListener('error', imageLoadError);
        });

        img.src = window.URL.createObjectURL(file);
    });


export const checkResolutionImage = async (file, t, minDimensions, maxDimensions) => {
    const sizes = await getImageSizes(file);

    if (sizes.width === 0 || sizes.height === 0) {
        return t('Layout.fileFormatError', { formats: 'jpg, jpeg, png' });
    }

    if (sizes.width < minDimensions[0] || sizes.height < minDimensions[1]) {
        return t('Layout.minDimensionsError', {
            minWidth: minDimensions[0],
            minHeight: minDimensions[1],
        });
    }

    if (sizes.width > maxDimensions[0] || sizes.height > maxDimensions[1]) {
        return t('Layout.maxDimensionsError', { maxSize: maxDimensions[0] });
    }

    return false;
};
