import React from 'react';
import HeaderSection from "./HeaderSection";
import MainSection from "./MainSection";
import FooterSection from "./FooterSection";

// App is our top-level component which everything else is placed inside of
const App: React.FunctionComponent = (): JSX.Element => {
    return(
        <div className="app">
            <HeaderSection />
            <MainSection />
            <FooterSection />
        </div>
    );
}

export default App;
