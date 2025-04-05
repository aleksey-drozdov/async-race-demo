import { elementCreator } from '../../common/helpers/element-creator.ts';
import { LINKS } from './data.ts';
import redirect from '../../common/helpers/redirect.ts';
import ROUTES from '../../constants/routes.ts';

class Header {
  links: HTMLElement[] = [];

  constructor() {
    this.linkHandler = this.linkHandler.bind(this);
  }

  /**
   * Initializes the header with a set of menu items created from the LINKS array.
   * It dynamically generates anchor elements with appropriate attributes, classes, and titles.
   * The created header element is appended to the document body and is set up with a click event listener.
   *
   * @return {void} This method does not return a value. It sets up the necessary DOM elements and event listeners.
   */
  init(wrapper: HTMLElement) {
    const menuItems = LINKS.map(({ path, title, classes, id }) =>
      elementCreator('a', {
        attributes: {
          href: path,
          id,
        },
        classes,
        children: title,
      }));
    this.links = menuItems;


    const header = elementCreator('div', {
      children: menuItems,
      classes: ['header'],
    });
    header.addEventListener('click', this.linkHandler);

    wrapper.appendChild(header);
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

    const path = target.id;

    if (path) {
      this.links.forEach(link => {
        link.classList.remove('active');
        if (link.id === target.id) {
          link.classList.add('active');
        }
      });
      this.routeTo(path as keyof typeof ROUTES);
    }
  }

  /**
   * Updates the browser's current URL to the specified path and triggers route handling logic.
   *
   * @param {string} path - The desired route path to navigate to.
   * @return {void}
   */
  routeTo(path: keyof typeof ROUTES) {
    // change url
    redirect(path);

  }
}


const header = new Header();

export default header;
