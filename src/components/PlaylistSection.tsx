import React from 'react';

interface IProps {
    playlistId?: string;
}

const PlaylistSection: React.FunctionComponent<IProps> = (props: IProps): JSX.Element => {
    return (
        <div>
            <p>please select a playlist to begin!</p>
        </div>
    );
}

export default PlaylistSection;
