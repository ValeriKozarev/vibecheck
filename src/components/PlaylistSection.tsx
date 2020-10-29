import React from 'react';

interface IProps {
    playlistId?: string;
    token?: string;
}

const PlaylistSection: React.FunctionComponent<IProps> = (props: IProps): JSX.Element => {
    const {playlistId, token} = props;

    return (
        <div className="playlist">
            <p>This is the playlist section</p>
        </div>
    );
}

export default PlaylistSection;
