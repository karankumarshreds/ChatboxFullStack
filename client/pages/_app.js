import DataProvider from "../context/DataProvider";
import { initialState } from '../reducers/index';
import reducer from '../reducers';

const AppComponent = ({ Component, pageProps }) => {
    <DataProvider intialState={initialState} reducer={reducer}>
        <Component />
    </DataProvider>
}

AppComponent.getInitialProps = async (context) => {
    const pageProps = {};
    if (context.Component.getInitialProps) {
        pageProps = await context.Component.getInitialProps(context.ctx);
    }
    return { ...pageProps }
}

export default AppComponent;
