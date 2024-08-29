import {
  constructorActions,
  constructorReducer,
  TConstructorState
} from '../../services/slices/burgerConstructor';

import * as uuid from 'uuid';
jest.mock('uuid');

describe('Super test', () => {
  const initialState: TConstructorState = {
    bun: null,
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'MOCK Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: '1'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'MOCK Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '2'
      }
    ]
  };

  test('remove', () => {
    const result = constructorReducer(
      initialState,
      constructorActions.removeFromConstructor(1)
    );

    expect(result).toEqual({
      bun: null,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'MOCK Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          id: '1'
        }
      ]
    });
  });

  test('reorder', () => {
    const result = constructorReducer(
      initialState,
      constructorActions.reorderConstructor({ from: 1, to: 0 })
    );
    expect(result).toEqual({
      bun: null,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'MOCK Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          id: '2'
        },
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'MOCK Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          id: '1'
        }
      ]
    });
  });

  test('reset', () => {
    const result = constructorReducer(
      initialState,
      constructorActions.resetConstructor()
    );
    expect(result).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('add bun', () => {
    const uuidSpy = jest.spyOn(uuid, 'v4').mockReturnValue('123');
    const result = constructorReducer(
      initialState,
      constructorActions.addToConstructor({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'NEW BULKA',
        type: 'bun',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      })
    );
    // console.log(result);

    expect(result).toEqual({
      bun: {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'NEW BULKA',
        type: 'bun',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: '123'
      },
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'MOCK Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          id: '1'
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'MOCK Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          id: '2'
        }
      ]
    });
  });

  test('add ingredient', () => {
    const uuidSpy = jest.spyOn(uuid, 'v4').mockReturnValue('123');
    const result = constructorReducer(
      initialState,
      constructorActions.addToConstructor({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'NEW BULKA',
        type: 'ingredient',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      })
    );
    // console.log(result);

    expect(result).toEqual({
      bun: null,
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'MOCK Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          id: '1'
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'MOCK Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          id: '2'
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'NEW BULKA',
          type: 'ingredient',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          id: '123'
        }
      ]
    });
  });
});
