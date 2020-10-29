import React from 'react';

interface IProps {
    playlistId?: string;
}

const PlaylistSection: React.FunctionComponent<IProps> = (props: IProps): JSX.Element => {
    return (
        <div className="playlist">
            <p>This is the playlist section</p>
        </div>
    );
}

export default PlaylistSection;
