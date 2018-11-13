import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';
import key from './env.js';

const UPDATE_STATUS_ON_STATE = 'UPDATE_STATUS_ON_STATE';
const START_SPINNER = 'START_SPINNER';
const STOP_SPINNER = 'STOP_SPINNER';
const STOP_DIALOGS = 'STOP_DIALOGS';

export const stopDialogs = () => {
  return {
    type: STOP_DIALOGS
  };
};

const updatePathStatus = isPathDown => {
  return {
    type: UPDATE_STATUS_ON_STATE,
    isPathDown
  };
};

const startSpinner = () => {
  return {
    type: START_SPINNER
  };
};

const stopSpinner = () => {
  return {
    type: STOP_SPINNER
  };
};

export const checkIfPathDown = (startingLocation, destinationLocation) => {
  return async dispatch => {
    dispatch(startSpinner());

    let start = startingLocation;
    if (
      start.length === 0 ||
      start === 'Enter a starting location'
    ) {
      start = '100+7th+Street+Hoboken+NJ';
    } else {
      start = start.trim();
      start = start.replace(/\s+/g, '+');
    }

    let destination = destinationLocation

    if (
      destination.length === 0 ||
      destination === 'Enter a destination'
    ) {
      destination = 'Wall+St+New+York+City+NY';
    } else {
      destination = destination.trim();
      destination = destination.replace(/\s+/g, '+');
    }

    const queryString = `https://maps.googleapis.com/maps/api/directions/json?avoid=ferries&mode=transit&transit_mode=train&alternatives=true&origin=${start}&destination=${destination}&key=${
      key.googleKey
    }`;

    console.log(queryString);

    let isPathDown = true;
    const response = await axios.get(queryString);
    response.data.routes.map((route, routeNum) => {
      route.legs.map((leg, legNum) => {
        leg.steps.map(step => {
          if (step.transit_details) {
            if (step.transit_details.line.short_name === 'PATH') {
              isPathDown = false;
            }
          }
        });
      });
    });

    dispatch(stopSpinner());
    dispatch(updatePathStatus(isPathDown));
  };
};

const initialState = {
  isPathDown: false,
  runSpinner: false,
  pathDownDialog: false,
  pathOkDialog: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STATUS_ON_STATE:
      return Object.assign(
        {},
        { ...state },
        { isPathDown: action.isPathDown },
        { pathDownDialog: action.isPathDown ? true : false },
        { pathOkDialog: action.isPathDown ? false : true }
      );

    case START_SPINNER:
      return Object.assign({}, { ...state }, { runSpinner: true });

    case STOP_SPINNER:
      return Object.assign({}, { ...state }, { runSpinner: false });

    case STOP_DIALOGS:
      return Object.assign(
        {},
        { ...state },
        { pathOkDialog: false },
        { pathDownDialog: false }
      );

    default:
      return state;
  }
};

export const store = createStore(reducer, applyMiddleware(thunk, logger));
