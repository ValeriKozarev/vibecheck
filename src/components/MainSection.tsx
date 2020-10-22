import React, {useState, useCallback, useMemo} from 'react';
import LoginSection from "./LoginSection";
import PlaylistSection from "./PlaylistSection";
import {getParamValues} from '../utils/functions';

interface IProps{}

interface IStateProps{
    token: string;
}


const MainSection: React.FunctionComponent = ():JSX.Element => {
    const [token, setToken] = useState<string>("");

    const addTokenCallback = useCallback(
        (value: string): void => {
            if (value !== "") {
                console.log("IN CALLBACK: " + value);
                setToken(value);
            }
        },[token]);

    const body: JSX.Element = useMemo(() => {
        console.log("IN BODY: " + token);
        if (token === undefined || token === "") {
            return <LoginSection onClickCallback={addTokenCallback} />;
        } else {
            return <PlaylistSection token={token}/>;
        }
    }, [token]);

    return(
        <div>
            {body}
        </div>
    );
}

export default MainSection;
