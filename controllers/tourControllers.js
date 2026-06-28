const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

const checkId = (req, res, next, val) => {
  console.log('id is ' + val);
  if (val > tours.length)
    return res.status(404).json({ status: 'failure', message: 'invalid id ' });
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price',
    });
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  const tourId = +req.params.id;
  const targetTour = tours.find((tur) => tur.id === tourId);
  res.status(200).json({
    status: 'success',
    data: {
      tour: targetTour,
    },
  });
};

const creatNewTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) res.end('can not write in the file');

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

const editTour = (req, res) => {
  // console.log(req.body);
  let upTour = {};
  const updateTours = tours.map((tur) => {
    if (tur.id === tourId) return (upTour = { ...tur, ...req.body });
    return tur;
  });

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updateTours),
    (err) => {
      if (!err)
        return res.status(200).json({
          status: 'success',
          data: {
            tour: upTour,
          },
        });

      res.status(404).end('can not update&write in the file');
    },
  );
};

const deleteTour = (req, res) => {
  const tourId = +req.params.id;

  const newTours = tours.filter((tur) => tur.id !== tourId);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    (err) => {
      if (!err) return res.status(200).end('deleted successfully');

      res.status(404).end('can not delete in the file');
    },
  );
};

module.exports = {
  getAllTours,
  getTourById,
  creatNewTour,
  editTour,
  deleteTour,
  checkId,
  checkBody,
};
