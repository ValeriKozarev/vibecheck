import React from 'react';
import SpotifyWebApi from "spotify-web-api-js";


interface IProps {
    playlistID?: string;
    token?: string;
}

const PlaylistSection: React.FunctionComponent<IProps> = (props: IProps): JSX.Element => {
    const {playlistID, token} = props;

    const spotifyWebApi = new SpotifyWebApi();
    if (token) {
        spotifyWebApi.setAccessToken(token);
    }

    if (playlistID) {
        // load playlist info (will move later)
        spotifyWebApi.getPlaylistTracks(playlistID).then((response) => {
            console.log(response);
            // processPlaylistStats(response.tracks);
        });
    }

    return (
        <div className="playlist">
            {playlistID === "" ? <p>Please select a playlist!</p> : <p>PlaylistID is {playlistID}</p> }
            {playlistID !== "" ? <p></p> : null}
        </div>
    );
}

export default PlaylistSection;
