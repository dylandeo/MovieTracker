import React from 'react';

//svg gets the heart icon we want
//this handles adding to likes
const RemoveLikes = () =>
    {
        return (
            <>
            <span className="m-2">Remove Like</span>
            <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
            </>
        )
    }

export default RemoveLikes;