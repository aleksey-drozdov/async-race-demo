import Header from './modules/header';
import Garage from './modules/garage';
import CreateCar from './modules/create-car';
import Winners from './modules/winners';
import { elementCreator } from './common/helpers/element-creator.ts';

class App {
  headerWrapper: HTMLElement = document.body;
  contentWrapper: HTMLElement = document.body;

  constructor() {
    this.init();
  }

  init() {
    const headerWrapper = elementCreator('header');
    const contentWrapper = elementCreator('main');
    this.headerWrapper = headerWrapper;
    this.contentWrapper = contentWrapper;
    document.body.appendChild(headerWrapper);
    document.body.appendChild(contentWrapper);

    Header.init(this.headerWrapper);

    window.addEventListener('changeRoute', () => {
      const currentPath = window.location.pathname;
      this.handleRoute(currentPath);
    });

    this.handleRoute(window.location.pathname);

  }

  /**
   * Handles routing logic based on the given path.
   *
   * @param {string} path - The path to route to. It determines which logic to execute.
   * @return {void} No value is returned from this method.
   */
  handleRoute(path: string) {
    switch (path) {
      case '/':
        Garage.init(this.contentWrapper);
        break;
      case '/create-car':
        CreateCar.init(this.contentWrapper);
        break;
      case '/winners':
        Winners.init();
        break;
      default:
        console.log(`No page logic found for: ${path}`);
    }
  }

}

new App();
