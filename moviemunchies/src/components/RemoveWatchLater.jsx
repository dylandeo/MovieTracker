import React from 'react';


const RemoveWatchLater = () =>
    {
        return (
            <>
            <span className="m-2">Remove from Watch Later</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4l3.5 2a.5.5 0 0 1-.5.866L8 8.5V4a.5.5 0 0 1 .5-.5z"/>
                <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm0-1A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"/>
            </svg>
            </>
        )
    }

export default RemoveWatchLater;