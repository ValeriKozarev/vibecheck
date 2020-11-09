import React, {useCallback, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import {getParamValues} from "../utils/functions";
import {IOnClickCallback} from "../data";


interface IProps {
    onClickCallback: IOnClickCallback;
}

/**
 * Function Component starts Spotify Web API OAUTH flow once user clicks on
 * the login button
 */
const LoginSection: React.FunctionComponent<IProps> = (props: IProps) => {
    const {onClickCallback} = props;
    const {REACT_APP_CLIENT_ID,
            REACT_APP_AUTHORIZE_URL,
            REACT_APP_REDIRECT_URL} = process.env;

    const handleOnClick = useCallback(() => {
        window.location.href = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`;
    }, []);

    useEffect(() => {
        const access_token = getParamValues(window.location.hash).access_token;
        onClickCallback(access_token);
    },[]);

    return (
        <div className="login">
            <p>Welcome to Vibecheck! Login and check out some the audio features of your playlists!</p>
            <Button variant="info" type="submit" onClick={handleOnClick}>Login to Spotify</Button>
        </div>
    );
}

export default LoginSection;
