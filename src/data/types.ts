/**
 * At a minimum a playlist should know its name and Spotify Playlist ID
 */
export interface IPlaylist {
    id: string;
    name: string;
}

/**
 * Callback function to take a playlist ID from the select PlaylistMenuRow
 * and bubble all the way back up to the PlaylistMenuSection and then the MainSection components
 */
export interface IPlaylistSelectCallback {
    (value: string): void;
}

/**
 * Callback function to indicate user has clicked on the login button
 */
export interface IOnClickCallback {
    (value: string): void;
}
