import {  screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderForTest } from '../utils/testingUtils';
import StatusDetails from "../components/statusDetails";
import * as redux from 'react-redux';

const sampleDashboardState = {
    status: {
        statuses: [],
        isInError: false,
        isLoading: false,
        lastUpdateTime: new Date()
    }
}

describe("<StatusDetails />", () => {
    const dispatchMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    });

    it("renders main components", () => {
    renderForTest(<StatusDetails />, { reduxState: sampleDashboardState });

    expect(screen.getByLabelText(/statuses/)).toBeVisible();
    expect(screen.getByLabelText(/refresh/)).toBeVisible();
  });
});