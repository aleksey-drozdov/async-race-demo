import { elementCreator } from '../../common/helpers/element-creator.ts';
import { LINKS } from './data.ts';

class Header {
  links: HTMLElement[] = [];
  constructor() {
    this.linkHandler = this.linkHandler.bind(this)
  }

  /**
   * Initializes the header with a set of menu items created from the LINKS array.
   * It dynamically generates anchor elements with appropriate attributes, classes, and titles.
   * The created header element is appended to the document body and is set up with a click event listener.
   *
   * @return {void} This method does not return a value. It sets up the necessary DOM elements and event listeners.
   */
  init() {
    const menuItems = LINKS.map(({path,title,classes}) =>
      elementCreator('a', {
        attributes: {
          href: path,
        },
        classes,
        children: title,
      }))
    this.links = menuItems;


    const header = elementCreator('header', {
      children: menuItems
    })
    header.addEventListener('click', this.linkHandler)

    document.body.appendChild(header);
  }

  /**
   * Handles click events on links, preventing the default behavior and routing to the specified href.
   *
   * @param {MouseEvent} event - The mouse event triggered by clicking on a link.
   * @return {void}
   */
  linkHandler(event: MouseEvent) {
    event.preventDefault();

    const target = event.target as HTMLElement;

    if (!target || target.tagName !== 'A') return;

    const href = target.getAttribute('href');

    if (href) {
      this.routeTo(href);
    }
  }

  /**
   * Updates the browser's current URL to the specified path and triggers route handling logic.
   *
   * @param {string} path - The desired route path to navigate to.
   * @return {void}
   */
  routeTo(path: string) {
    // change url
    window.history.pushState({}, '', path);

    this.handleRoute(path);
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


const header = new Header();

export default header;
