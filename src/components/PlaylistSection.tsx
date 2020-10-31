import React from 'react';

interface IProps {
    playlistID?: string;
    token?: string;
}

const PlaylistSection: React.FunctionComponent<IProps> = (props: IProps): JSX.Element => {
    const {playlistID, token} = props;

    return (
        <div className="playlist">
            {playlistID === "" ? <p>Please select a playlist!</p> : <p>PlaylistID is {playlistID}</p> }
        </div>
    );
}

export default PlaylistSection;
