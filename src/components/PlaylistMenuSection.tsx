import React, {useMemo, useState} from 'react';
import SpotifyWebApi from "spotify-web-api-js";

interface IPlaylist {
    id: string;
    name: string;
}

interface IPlaylistMenuRowProps {
    entry: IPlaylist;
}

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

type PlaylistEntries = IPlaylist[];

interface IPlaylistMenuRowsProps {
    playlists: PlaylistEntries;
}

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


interface IProps {
    token: string;
}

const PlaylistMenuSection: React.FunctionComponent<IProps> = (props: IProps): JSX.Element => {
    const {token} = props;
    const [myPlaylists, setMyPlaylists] = useState<PlaylistEntries>([]);
    const spotifyWebApi = new SpotifyWebApi();
    spotifyWebApi.setAccessToken(token);

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
        <div>
            <p>welcome! token is {token}</p>
            <br />

            <h2>Your Playlists</h2>
            <table>
                <PlaylistMenuRows playlists={myPlaylists} />
            </table>
        </div>
    );
}

export default PlaylistMenuSection;
