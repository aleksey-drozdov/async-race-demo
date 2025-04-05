import ROUTES from '../../constants/routes.ts';

const comparePath = (path: keyof typeof ROUTES, url: string): boolean => {
  const templateUrl = ROUTES[path]
    .replace(/:[^/]+/g, '[^/]+')
    .replace(/\//g, '\\/');

  const regex = new RegExp(`^${templateUrl}$`);
  return regex.test(url);

};

export default comparePath;
