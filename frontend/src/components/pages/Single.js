import React from 'react';
import { SinglePage } from '../../core/pages/SinglePage';
import { useParams } from 'react-router-dom';
import { SinglePostData } from '../../data/SinglePostData';

const Single = () => {
    const { id } = useParams();
    const { post } = SinglePostData(id);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    return (
        <SinglePage 
            post = { post }
            getText = { getText }
        />
    );
};

export default Single;
