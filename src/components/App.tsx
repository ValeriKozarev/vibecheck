import React from 'react';
import HeaderSection from "./HeaderSection";
import MainSection from "./MainSection";
import FooterSection from "./FooterSection";

const App: React.FunctionComponent = (): JSX.Element => {
    return(
        <div>
            <HeaderSection />
            <MainSection />
            <FooterSection />
        </div>
    );
}

export default App;
