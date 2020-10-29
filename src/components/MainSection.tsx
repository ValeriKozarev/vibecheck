import React, {useState, useCallback, useMemo} from 'react';
import LoginSection from "./LoginSection";
import PlaylistMenuSection from "./PlaylistMenuSection";
import PlaylistSection from "./PlaylistSection";

const MainSection: React.FunctionComponent = ():JSX.Element => {
    const [token, setToken] = useState<string>("");

    const addTokenCallback = useCallback(
        (value: string): void => {
            if (value !== "") {
                setToken(value);
            }
        },[token]);

    const body: JSX.Element = useMemo(() => {
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
        <div className="body">
            {body}
        </div>
    );
}

export default MainSection;
