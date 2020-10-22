import React, {useState, useCallback, useMemo} from 'react';
import LoginSection from "./LoginSection";
import PlaylistMenuSection from "./PlaylistMenuSection";
import PlaylistSection from "./PlaylistSection";

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
            return (
                <>
                    <PlaylistMenuSection token={token}/>
                    <PlaylistSection />
                </>
            );
        }
    }, [token]);

    return(
        <div>
            {body}
        </div>
    );
}

export default MainSection;
