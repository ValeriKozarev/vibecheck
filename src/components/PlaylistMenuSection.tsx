import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {PlaylistEntries} from "../types";
import {IPlaylist, IPlaylistSelectCallback} from "../data";
import SpotifyWebApi from "spotify-web-api-js";

interface IPlaylistMenuRowProps {
    entry: IPlaylist;
    playlistSelectCallback: IPlaylistSelectCallback;
}

/**
 * Private component that represents a single row (playlist) in the playlist
 * menu component
 */
const PlaylistMenuRow: React.FunctionComponent<IPlaylistMenuRowProps> = (props: IPlaylistMenuRowProps): JSX.Element => {
    const {entry, playlistSelectCallback} = props;

    const handlePlaylistSelect = useCallback(() => {
        playlistSelectCallback(entry.id);
    },[]);

    return(
        <tr key={entry.id}>
            <td>
                <span key={entry.id}>
                    <a key={entry.id} href="javascript:;" onClick={() => handlePlaylistSelect()}>{entry.name}</a>
                </span>
            </td>
        </tr>
    );
};

interface IPlaylistMenuRowsProps {
    playlists: PlaylistEntries;
    playlistSelectCallback: IPlaylistSelectCallback;
}

/**
 * Private component that maps playlist objects to playlistmenurow components
 */
const PlaylistMenuRows: React.FunctionComponent<IPlaylistMenuRowsProps> = (props: IPlaylistMenuRowsProps): JSX.Element | null => {
    const {playlists,playlistSelectCallback} = props;

    const rows = playlists.map((entry: IPlaylist) => {
        return <PlaylistMenuRow key={entry.id} entry={entry} playlistSelectCallback={playlistSelectCallback}/>;
    });

    if (rows.length > 0) {
        return <tbody>{rows}</tbody>;
    }
    return null;
}

interface IProps {
    token: string;
    playlistSelectCallback: IPlaylistSelectCallback;
}

/**
 * The top level component which builds out the hierarchy of the playlist menu
 * This component defines the list of playlists as State to maintain and invokes
 * the Spotify Web API wrapper to fetch playlist data for the user
 */
const PlaylistMenuSection: React.FunctionComponent<IProps> = (props: IProps): JSX.Element => {
    const {token, playlistSelectCallback} = props;
    const [myPlaylists, setMyPlaylists] = useState<PlaylistEntries>([]);

    const spotifyWebApi = new SpotifyWebApi();
    spotifyWebApi.setAccessToken(token);

    // putting this into useEffect should mean it only executes once
    useEffect(() => {
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
    },[]);

    return(
        <div className="playlist-menu">
            <div className="instructions">
                <p>Select one of your playlist below!</p>
            </div>

            <h2>Your Playlists</h2>
            <table>
                <PlaylistMenuRows playlists={myPlaylists} playlistSelectCallback={playlistSelectCallback}/>
            </table>
        </div>
    );
}

// only the top level component is public
export default PlaylistMenuSection;
