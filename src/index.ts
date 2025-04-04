import header from './modules/header';
class App {
  constructor() {
    this.init()
  }

  init() {
    header.init();

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
        console.log('Home page logic executed');
        break;
      case '/winners':
        console.log('winners page logic executed');
        break;
      default:
        console.log(`No page logic found for: ${path}`);
    }
  }

}

new App();
