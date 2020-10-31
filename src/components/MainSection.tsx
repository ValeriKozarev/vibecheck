import React, {useState, useCallback, useMemo} from 'react';
import LoginSection from "./LoginSection";
import PlaylistMenuSection from "./PlaylistMenuSection";
import PlaylistSection from "./PlaylistSection";

const MainSection: React.FunctionComponent = ():JSX.Element => {
    // token state and callback
    const [token, setToken] = useState<string>("");

    const addTokenCallback = useCallback(
        (value: string): void => {
            if (value !== "") {
                setToken(value);
            }
        },[token]);

    // playlistID state and callback
    const [playlistID, setPlaylistID] = useState<string>("");

    const setPlaylistCallback = useCallback(
        (value: string): void => {
            if (value !== "") {
                setPlaylistID(value);
            }
        },[playlistID]);

    const body: JSX.Element = useMemo(() => {
        if (token === undefined || token === "") {
            return <LoginSection onClickCallback={addTokenCallback} />;
        } else {
            return (
                <>
                    <PlaylistMenuSection token={token} playlistSelectCallback={setPlaylistCallback}/>
                    <PlaylistSection token={token} playlistID={playlistID}/>
                </>
            );
        }
    }, [token, playlistID]);

    return(
        <div className="body">
            {body}
        </div>
    );
}

export default MainSection;
