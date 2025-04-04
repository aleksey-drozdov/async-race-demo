import Header from './modules/header';
import Garage from './modules/garage';
import Winners from './modules/winners';
class App {
  constructor() {
    this.init()
  }

  init() {
    Header.init();

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
        Garage.init()
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
