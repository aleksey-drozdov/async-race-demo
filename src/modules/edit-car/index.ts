import { elementCreator } from '../../common/helpers/element-creator.ts';
import API from '../../common/services/api.ts';
import { ICar } from '../../interfaces/car.ts';

class EditCar {
  modelField?: HTMLInputElement;
  colorField?: HTMLInputElement;
  id?: string;

  constructor() {
  }

  /**
   * Initializes the UI form for input fields and attaches event listeners.
   * Sets up and appends the form components including model input, color input,
   * and submit button to the specified wrapper element.
   *
   * @param {HTMLElement} wrapper - The target HTML element where the form will be rendered.
   * @param {string} vehicleId - The unique identifier for the vehicle associated with this form.
   * @return {void} This method does not return a value.
   */
  async init(wrapper: HTMLElement, vehicleId: string) {
    try {
      this.id = vehicleId;
      const carData = await API.getCar(vehicleId);
      console.log({ carData });
      const modelField = elementCreator('input', {
        attributes: {
          type: 'text',
          placeholder: 'Model',
        },
      });
      modelField.value = carData.name;
      const colorField = elementCreator('input', {
        attributes: {
          type: 'color',
          placeholder: 'Color',
        },
      });
      colorField.value = carData.color;
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
    } catch (e) {
      console.log(e);
    }
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
      if (!this.id) {
        console.log('no Id');
        return;
      }
      await API.editCar(this.id, data);
    } catch (e) {
      console.error(e);
    }
  }
}

const editCar = new EditCar();

export default editCar;
