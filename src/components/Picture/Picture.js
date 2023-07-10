import React from 'react';


function Picture({img, imgTitle}) {

    return (
        <img src={img}
             alt={imgTitle}
        />
    );
}

export default Picture;
