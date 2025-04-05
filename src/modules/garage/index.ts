import API from '../../common/services/api.ts';
import { TDataWithId } from '../../interfaces/common.ts';
import { ICar } from '../../interfaces/car.ts';
import { elementCreator } from '../../common/helpers/element-creator.ts';
import redirect from '../../common/helpers/redirect.ts';

class Garage {
  cars: TDataWithId<ICar>[] = [];
  carsListWrapper: HTMLDivElement | undefined;

  constructor() {
  }

  init(wrapper: HTMLElement) {
    this.carsListWrapper = elementCreator('div', {
      classes: ['cars'],
    });
    const content = elementCreator('div', {
      classes: ['garage'],
      children: [this.carsListWrapper],
    });
    wrapper.innerHTML = '';
    wrapper.appendChild(content);
    this.getCars();
  }

  async getCars(page: number = 0, limit: number = 5) {
    try {
      this.cars = await API.getCars(page, limit);
      this.drawCars();
    } catch (e) {
      console.log(e);
    }
  }

  drawCars() {
    this.cars.forEach(car => {
      const carModel = elementCreator('span', {
        classes: ['model'],
        children: car.name,
      });
      const carColorBox = elementCreator('div', {
        classes: ['colorBox'],
        attributes: {
          style: `background-color: ${car.color};`,
        },
      });
      const carColorHEX = elementCreator('span', {
        classes: ['colorHEX'],
        children: car.color,
      });
      const editBtn = elementCreator('button', {
        children: 'Edit',
        classes: ['editBtn'],
      });
      editBtn.addEventListener('click', () => {
        redirect('editCar', {
          id: car.id,
        });
      });
      const carWrap = elementCreator('div', {
        classes: ['car'],
        children: [carModel, carColorBox, carColorHEX, editBtn],
      });
      this.carsListWrapper?.appendChild(
        carWrap,
      );
    });
  }
}

const garage = new Garage();

export default garage;
