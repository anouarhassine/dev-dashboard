import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

export const renderForTest = (uiComponent, config: {reduxState: any} = {reduxState: {}}) => {
    const store = mockStore(config.reduxState);
    const componentWrapper = ({children}) => (
        <Provider store={store}>
            {children}
        </Provider>
    );

    return render(uiComponent, {wrapper: componentWrapper});
}