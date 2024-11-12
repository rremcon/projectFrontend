import React from 'react';


function Picture({className, img, imgTitle}) {

    return (

        // <span className="image-wrapper">
        <span className={className}>
        <img src={img}
             alt={imgTitle}
        />
        </span>

    );
            }

            export default Picture;
