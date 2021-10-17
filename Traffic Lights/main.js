// [
//     "CCC.G...R...", // 0 initial state as passed
//     ".CCCG...R...", // 1
//     "..CCC...R...", // 2 show 1st car, not the green light
//     "..CCGC..R...", // 3 2nd car cannot enter intersection because 1st car blocks the exit
//     "...CC.C.R...", // 4 show 2nd car, not the green light
//     "...COC.CG...", // 5 3rd car stops for the orange light
//     "...CR.C.C...", // 6
//     "...CR..CGC..", // 7
//     "...CR...C.C.", // 8
//     "...CR...GC.C", // 9
//     "...CR...O.C.", // 10
//     "....C...R..C", // 11 3rd car can proceed
//     "....GC..R...", // 12
//     "....G.C.R...", // 13
//     "....G..CR...", // 14
//     "....G..CR...", // 15
//     "....O...C..."  // 16
//   ]

function trafficLights(initialState, rounds) {
  const result = [];
  const statesEnum = {
    ROAD: '.',
    CAR: 'C',
    RED_LIGHT: 'R',
    ORANGE_LIGHT: 'O',
    GREEN_LIGHT: 'G',
  };

  const getSpaceModel = (state) => {
    const type = getType(state);
    const iterations = getIterations(state, type);


    return {
      type,
      isOccupied: state === statesEnum.CAR,
      iterationsLeft: iterations,
      color: iterations ? state : null,
    };
  };

  const getType = (state) => {
    return state === statesEnum.CAR || state === statesEnum.ROAD ? 'ROAD' : 'LIGHT';
  };

  const getIterations = (state, type) => {
    if (type === 'LIGHT') {
      return state === statesEnum.ORANGE_LIGHT ? 0 : 4;
    }
  };

  const convertToString = (state) => {
    return state
      .map((space) => {
        if (space.isOccupied) {
          return statesEnum.CAR;
        }

        if (space.type === 'ROAD') {
          return '.';
        } else {
          return space.color;
        }
      })
      .join('');
  };

  const manageLight = (currentSpace) => {
    if (currentSpace.iterationsLeft === 0) {
      currentSpace.color = getNextLight(currentSpace.color);
      currentSpace.iterationsLeft = currentSpace.color === statesEnum.ORANGE_LIGHT ? 0 : 4;
    } else {
      currentSpace.iterationsLeft--;
    }
  };

  const getNextLight = (current) => {
    switch (current) {
      case statesEnum.RED_LIGHT:
        return statesEnum.GREEN_LIGHT;
      case statesEnum.GREEN_LIGHT:
        return statesEnum.ORANGE_LIGHT;
      case statesEnum.ORANGE_LIGHT:
        return statesEnum.RED_LIGHT;
    }
  };

  const transitTraffic = (state) => {
    for (let i = state.length; i--; i > -1) {
      const isLast = i === state.length - 1;
      const currentSpace = state[i];
      const nextSpace = state[i + 1];
      const twoSpacesAheadSpace = state[i + 2];

      if (currentSpace.isOccupied) {
        if (isLast) {
          currentSpace.isOccupied = false;
        } else {
          if (
            !(
              nextSpace.isOccupied ||
              (nextSpace.type === 'LIGHT' &&
                (nextSpace.color === statesEnum.ORANGE_LIGHT || nextSpace.color === statesEnum.RED_LIGHT)) ||
              (nextSpace.type === 'LIGHT' &&
                nextSpace.color === statesEnum.GREEN_LIGHT &&
                twoSpacesAheadSpace.isOccupied)
            )
          ) {
            currentSpace.isOccupied = false;
            nextSpace.isOccupied = true;
          }
        }
      }

      if (currentSpace.type === 'LIGHT') {
        manageLight(currentSpace);
      }
    }
  };
  const roadState = initialState.split('').map(getSpaceModel);

  result.push(initialState);

  for (let i = rounds; i--; i > 0) {
    transitTraffic(roadState);
    result.push(convertToString(roadState));
  }

  return result;
}
