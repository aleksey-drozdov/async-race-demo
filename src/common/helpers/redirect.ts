import { changeRouteEvent } from '../custom-events';
import ROUTES from '../../constants/routes.ts';

const redirect = (path: keyof typeof ROUTES, params?: Record<string, string>) => {
  let route = ROUTES[path];

  if (params) {
    route = route.replace(/:([a-zA-Z]+)/g, (_, key) => {
      if (params[key] === undefined) {
        throw new Error(`Route "${route}" don't have param: ${key}`);
      }
      return params[key];
    });

  }

  window.history.pushState({}, '', route);
  window.dispatchEvent(changeRouteEvent);
};

export default redirect;
