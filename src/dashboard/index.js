import React, { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import FSLightbox from "fslightbox-react";
import { loadImages } from "./images";

const Dashboard = () => {
    const [images, setImages] = useState([]); // State to store images
    const [index, setIndex] = useState(-1);   // Index of the currently opened image

    useEffect(() => {
        const fetchImages = async () => {
            const loadedImages = await loadImages();
            setImages(loadedImages);
        };

        fetchImages();
    }, []);

    const handleClick = (index) => setIndex(index);

    return (
        <div>
            <p className="text-4xl font-bold my-8">Brrr De Money Memes</p>
            <div className="max-w-7xl m-auto">
                {images.length > 0 ? (
                    <Gallery
                        images={images.map((img) => ({
                            ...img,
                            thumbnail: img.src, // Add thumbnail if not present in the image object
                        }))}
                        onClick={(index) => handleClick(index)} // On click, set the index to show in lightbox
                        enableImageSelection={false}
                    />
                ) : (
                    <p>Loading images...</p>
                )}

                <FSLightbox
                    toggler={index} // When index is set, the lightbox will open
                    sources={images.map((img) => img.src)} // Array of image sources for lightbox
                    index={index} // Index of the current image to be displayed in the lightbox
                />
            </div>
        </div>
    );
};

export default Dashboard;
