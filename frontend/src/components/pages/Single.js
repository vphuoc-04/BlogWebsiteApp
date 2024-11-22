import React from 'react';
import { SinglePage } from '../../core/pages/SinglePage';
import { useLocation } from 'react-router-dom';
import { SinglePostData } from '../../data/SinglePostData';

const Single = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const postId = queryParams.get("id");

    const { post } = SinglePostData(postId);

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
