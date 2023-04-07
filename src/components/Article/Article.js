import React from 'react';
import './Article.css'

function Article({className, articleName, articleDescription}) {

    return (
        <>
            <article className={className}>
                <h2>{articleName}</h2>
                <p>{articleDescription}</p>
            </article>
        </>
    );
}

export default Article;