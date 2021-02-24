function planeSeatsAllocator(numberOfRows, reservedSeats = '') {
  if (numberOfRows < 1 || numberOfRows > 50) {
    return;
  }

  const columns = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F', 'G'],
    ['H', 'J', 'K'],
  ];

  const bookedSeats = prepareReservedSeats(reservedSeats);

  let foundSeats = 0;
  let iterator = 0;

  while (iterator < numberOfRows) {
    columns.forEach((column, index) => {
      const vacantSeats = column.filter((char) => !bookedSeats[iterator]?.includes(char));
      const vacantSeatsNumber = vacantSeats.length;

      if (vacantSeatsNumber >= 3) {
        if (index !== 1) {
          foundSeats++;
        } else {
          if (vacantSeats.includes('E' && 'F')) {
            foundSeats++;
          }
        }
      }
    });

    iterator++;
  }
  numberOfRows;

  return foundSeats;
}

function getBookedSeats(reservedSeats) {
  return reservedSeats.split(' ');
}

function getRowNumbersWithBookedSeat(bookedSeats) {
  return Array.from(new Set(bookedSeats.map((seat) => (seat.length === 2 ? seat[0] : seat[0] + seat[1]))));
}

function prepareReservedSeats(reservedSeats) {
  const bookedSeats = getBookedSeats(reservedSeats);
  const rowNumbersWithReservedSeats = getRowNumbersWithBookedSeat(bookedSeats);

  return rowNumbersWithReservedSeats.map((rowNumber) =>
    bookedSeats.filter((seat) => new RegExp(`^${rowNumber}(?=[A-Z])`).test(seat)).map((seat) => seat[seat.length - 1])
  );
}


// second version

function planeSeatsAllocatorVersionTwo(numberOfRows, reservedSeats = '') {
  if (numberOfRows < 1 || numberOfRows > 50) {
    return;
  }

  const columns = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F', 'G'],
    ['H', 'J', 'K'],
  ];

  const occupiedSeats = [];
  for (let i = 0; i < numberOfRows; i++) {
    occupiedSeats.push(['', '', '']);
  }

  const getColumnIndex = (letter) => columns.findIndex((col) => col.includes(letter));

  const transpileSeat = (seat) => {
    const seatLetter = seat[seat.length - 1];
    return {
      rowIndex: parseInt(seat) - 1,
      columnIndex: getColumnIndex(seatLetter);
      seatLetter,
    };
  };

  const convertToBool = (seat, index) =>
    index !== 1 ? Boolean(seat) : seat.includes('E' || 'F') || (seat.includes('G') && seat.includes('D'));

  const transpiledSeatMap = reservedSeats.split(' ').map(transpileSeat);

  transpiledSeatMap.forEach(({ rowIndex, columnIndex, seatLetter }) => {
    occupiedSeats[rowIndex][columnIndex] += seatLetter;
  });

  return occupiedSeats
    .map((row) => row.map(convertToBool))
    .flat()
    .filter((bool) => !bool).length;
}
