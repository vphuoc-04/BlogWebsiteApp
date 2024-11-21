import React from 'react'
import { SinglePage } from '../../core/pages/SinglePage';
import { useLocation } from 'react-router-dom';
import { SinglePostData } from '../../data/SinglePostData';

const Single = () => {
    const location = useLocation();
    
    const [slug, postId] = location.pathname.split("/")[2].split("&id=");

    const { post } = SinglePostData(slug, postId);

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
