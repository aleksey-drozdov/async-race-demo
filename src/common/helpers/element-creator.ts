
export type TElementCreatorOptions = {
  classes?: string[];
  attributes?: Record<string, string>;
  children?: (HTMLElement | string) | (HTMLElement | string)[];
};

export function elementCreator<K extends keyof HTMLElementTagNameMap>(tag: K,options?: TElementCreatorOptions):HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (options?.classes) {
    options.classes.forEach(className => element.classList.add(className));
  }

  if (options?.attributes) {
    for (const [key, value] of Object.entries(options.attributes)) {
      element.setAttribute(key, value);
    }
  }

  if (options?.children) {
    if (!Array.isArray(options.children)) {
      if (typeof options.children === 'string') {
        element.appendChild(document.createTextNode(options.children));
      } else {
        element.appendChild(options.children);
      }
    } else {
      for (const child of options.children) {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      }
    }
  }


  return element;
}
