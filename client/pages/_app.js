
import DataProvider from "../context/DataProvider";
import { initialState } from '../reducers/index';
import { reducer } from '../reducers';


const AppComponent = ({ Component, pageProps }) => {
    return (
        <DataProvider intialState={initialState} reducer={reducer}>
            <Component {...pageProps} />
        </DataProvider>
    )
}

AppComponent.getInitialProps = async (appContext) => {
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return { pageProps }
}

export default AppComponent;
