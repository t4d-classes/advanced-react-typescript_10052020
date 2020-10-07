import { useState, useCallback, useMemo } from 'react';

import { Car, CarKeys } from '../models/Car';
import { CarsSort, SORT_ASC, SORT_DESC } from '../models/CarsSort';
import { CarFormData } from '../models/CarFormData';
import { CarToolStore } from '../models/CarToolStore';
import { useList } from '../hooks/useList';
import { ConfirmDeleteCarMessage } from '../models/ConfirmDeleteCarMessage';

const sortedCars = (cars: Car[], carsSort: CarsSort) => {
  return cars.concat().sort((a: Car, b: Car) => {
    const left = String(a[carsSort.col]).toUpperCase();
    const right = String(b[carsSort.col]).toUpperCase();

    if (left < right) {
      return carsSort.dir === SORT_ASC ? -1 : 1;
    } else if (left > right) {
      return carsSort.dir === SORT_ASC ? 1 : -1;
    } else {
      return 0;
    }
  });
};

type UseCarToolStore = (initialCars: Car[]) => CarToolStore;

export const useCarToolStore: UseCarToolStore = (initialCars) => {
  const [carsSort, setCarsSort] = useState<CarsSort>({
    col: 'id',
    dir: SORT_ASC,
  });
  const [editCarId, setEditCarId] = useState(-1);
  const [cars, appendCar, replaceCar, removeCar] = useList<Car>([
    ...initialCars,
  ]);

  const [confirmDeleteCarMessage, setConfirmDeleteCarMessage] = useState<
    ConfirmDeleteCarMessage
  >({
    message: '',
    carId: -1,
  });

  // LAB: step 1 - add arrow function
  // const editCar = (carId: number) => {
  //   setEditCarId(carId);
  // };

  // LAB: step 2 - add keyword function
  // function editCar(carId: number) {
  //   // LAB: step 3
  //   // performance mark is a good way to mark an event
  //   // event when optimized the mark will appears in the optimize onClick function
  //   // console.log('editCar');
  //   performance.mark('editCar');
  //   setEditCarId(carId);
  // }

  const editCarCallback = useCallback(function editCar(carId: number) {
    // LAB: step 3
    // performance mark is a good way to mark an event
    // event when optimized the mark will appears in the optimize onClick function
    // console.log('editCar');
    performance.mark('editCar');
    setEditCarId(carId);
  }, []);

  // const addCar = (carForm: CarFormData) => {
  //   performance.mark('addCar');
  //   appendCar(carForm);
  //   setEditCarId(-1);
  // };

  const addCarCallback = useCallback(
    function addCar(carForm: CarFormData) {
      performance.mark('addCar');
      appendCar(carForm);
      setEditCarId(-1);
    },
    [appendCar],
  );

  // const saveCar = (car: Car) => {
  //   replaceCar(car);
  //   setEditCarId(-1);
  // };

  const saveCarCallback = useCallback(
    function saveCar(car: Car) {
      replaceCar(car);
      setEditCarId(-1);
    },
    [replaceCar],
  );

  // const confirmDeleteCar = (carId: number) => {
  //   const { make, model, year } = cars.find((c) => c.id === carId)!;

  //   setConfirmDeleteCarMessage({
  //     message: `Are you sure you want to delete the ${year} ${make} ${model}?`,
  //     carId,
  //   });
  // };

  const confirmDeleteCarCallback = useCallback(
    function confirmDeleteCar(carId: number) {
      const { make, model, year } = cars.find((c) => c.id === carId)!;

      setConfirmDeleteCarMessage({
        message: `Are you sure you want to delete the ${year} ${make} ${model}?`,
        carId,
      });
    },
    [cars],
  );

  const deleteCar = (carId: number) => {
    removeCar(carId);
    setEditCarId(-1);
    setConfirmDeleteCarMessage({
      message: '',
      carId: -1,
    });
  };

  // const cancelCar = () => {
  //   setEditCarId(-1);
  // };

  const cancelCarCallback = useCallback(() => {
    setEditCarId(-1);
  }, []);

  const sortCarsCallback = useCallback(
    function sortCars(col: CarKeys) {
      if (col === carsSort.col) {
        setCarsSort({
          col,
          dir: SORT_ASC === carsSort.dir ? SORT_DESC : SORT_ASC,
        });
      } else {
        setCarsSort({
          col,
          dir: SORT_ASC,
        });
      }
    },
    [carsSort],
  );

  function cancelConfirmDeleteCar() {
    setConfirmDeleteCarMessage({
      message: '',
      carId: -1,
    });
  }

  return {
    sortedCars: useMemo(() => sortedCars(cars, carsSort), [cars, carsSort]),
    editCarId,
    carsSort,
    confirmDeleteCarMessage,
    addCar: addCarCallback,
    saveCar: saveCarCallback,
    confirmDeleteCar: confirmDeleteCarCallback,
    deleteCar,
    editCar: editCarCallback,
    cancelCar: cancelCarCallback,
    sortCars: sortCarsCallback,
    cancelConfirmDeleteCar,
  };
};
