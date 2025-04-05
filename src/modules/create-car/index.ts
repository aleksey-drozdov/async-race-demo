import { elementCreator } from '../../common/helpers/element-creator.ts';
import API from '../../common/services/api.ts';
import { ICar } from '../../interfaces/car.ts';

class CreateCar {
  modelField?: HTMLInputElement;
  colorField?: HTMLInputElement;

  constructor() {
  }

  /**
   * Initializes the form by creating and appending input fields and a submit button to the specified wrapper element.
   * Sets up a click event handler for the submit button.
   *
   * @param {HTMLElement} wrapper - The container element where the form will be initialized and rendered.
   * @return {void} This method does not return any value.
   */
  init(wrapper: HTMLElement) {
    const modelField = elementCreator('input', {
      attributes: {
        type: 'text',
        placeholder: 'Model',
      },
    });
    const colorField = elementCreator('input', {
      attributes: {
        type: 'color',
        placeholder: 'Color',
      },
    });
    const submitBtn = elementCreator('button', {
      children: 'Submit',
    });
    submitBtn.addEventListener('click', this.submitHandler.bind(this));

    this.modelField = modelField;
    this.colorField = colorField;


    const content = elementCreator('div', {
      classes: ['form'],
      children: [modelField, colorField, submitBtn],
    });
    wrapper.innerHTML = '';
    wrapper.appendChild(content);
  }


  /**
   * Retrieves and constructs car data from the form fields.
   * Validates that required fields are not empty before returning the car object.
   *
   * @return {ICar} An object containing the car's name and color.
   * @throws {Error} If any required form fields are missing or empty.
   */
  private getFormData(): ICar {
    const modelName = this.modelField?.value;
    const carColor = this.colorField?.value;

    if (!modelName || !carColor) {
      throw new Error('Please fill all fields');
    }

    return { name: modelName, color: carColor };
  }

  /**
   * Handles the form submission process by gathering form data,
   * sending it to the API to create a new car, and logging the
   * created car information. If an error occurs during the process,
   * it catches and logs the error.
   *
   * @return {Promise<void>} A promise that resolves when the form submission process is complete.
   */
  async submitHandler() {
    try {
      const data = this.getFormData();
      const car = await API.createCar(data);
      console.log(car);
    } catch (e) {
      console.error(e);
    }
  }
}

const createCar = new CreateCar();

export default createCar;
