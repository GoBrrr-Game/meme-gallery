const importAllImages = async (r) => {
    const promises = r.keys().map(async (fileName) => {
        const img = new Image();
        const src = r(fileName);

        // Load the image asynchronously
        await new Promise((resolve) => {
            img.onload = resolve;
            img.src = src;
        });

        return {
            src,
            thumbnail: src,
            caption: fileName.replace('./', ''),
            width: img.width,
            height: img.height,
        };
    });

    return Promise.all(promises);
};

// Import images dynamically
export const loadImages = async () => {
    return await importAllImages(require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/));
};
