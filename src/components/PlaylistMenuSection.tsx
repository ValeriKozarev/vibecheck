import React, {useMemo, useState} from 'react';
import SpotifyWebApi from "spotify-web-api-js";

// define what a playlist looks like (will be moved later)
interface IPlaylist {
    id: string;
    name: string;
}

// a playlist menu row should hold a single playlist
interface IPlaylistMenuRowProps {
    entry: IPlaylist;
}

// this FC holds a single playlist and keys with its spotify playlist ID
const PlaylistMenuRow: React.FunctionComponent<IPlaylistMenuRowProps> = (props: IPlaylistMenuRowProps): JSX.Element => {
    const {entry} = props;

    return(
        <tr key={entry.id}>
            <td>
                <span key={entry.id}>
                    <a key={entry.id} href="#">{entry.name}</a>
                </span>
            </td>
        </tr>
    );
};

// define a custom type for readability (will be moved later)
type PlaylistEntries = IPlaylist[];

// allows for mapping of single playlist to single playlistMenuRow FC
interface IPlaylistMenuRowsProps {
    playlists: PlaylistEntries;
}

// this FC maps playlists to individulal rows
const PlaylistMenuRows: React.FunctionComponent<IPlaylistMenuRowsProps> = (props: IPlaylistMenuRowsProps): JSX.Element | null => {
    const {playlists} = props;

    const rows = playlists.map((entry: IPlaylist) => {
        return <PlaylistMenuRow key={entry.id} entry={entry} />;
    });

    if (rows.length > 0) {
        return <tbody>{rows}</tbody>;
    }
    return null;
}

// TODO: when user clicks on a playlist, send that playlistID and the token
// to the playlist section so it can load that playlist

// this FC needs to know the spotify access token to load user data
interface IProps {
    token: string;
}

// top level FC that ties together all the playlist elements defined above
const PlaylistMenuSection: React.FunctionComponent<IProps> = (props: IProps): JSX.Element => {
    const {token} = props;
    const [myPlaylists, setMyPlaylists] = useState<PlaylistEntries>([]);
    const spotifyWebApi = new SpotifyWebApi();
    spotifyWebApi.setAccessToken(token);

    // load user spotify playlists (will likely be moved later)
    spotifyWebApi.getUserPlaylists().then((response) => {
        let newPlaylists: PlaylistEntries = [];
        response.items.forEach(element => {
            let playlist: IPlaylist = {
                id: element.id,
                name: element.name
            };
            newPlaylists.push(playlist);
        });
        setMyPlaylists(newPlaylists);
    });

    return(
        <div className="playlist-menu">
            <div className="instructions">
                <p>Select one of your playlist below!</p>
            </div>

            <h2>Your Playlists</h2>
            <table>
                <PlaylistMenuRows playlists={myPlaylists} />
            </table>
        </div>
    );
}

export default PlaylistMenuSection;
