const express = require('express');

const tourcontroller = require('../controllers/tourController');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourcontroller.aliasroute, tourcontroller.getAllTours);

router.route('/tour-stats').get(tourcontroller.getTourStats);
router.route('/monthly-plan/:year').get(tourcontroller.getMonthlyPlan);

router
  .route('/')
  .get(tourcontroller.getAllTours)
  .post(tourcontroller.createNewTour);
router
  .route('/:id')
  .get(tourcontroller.getTour)
  .patch(tourcontroller.updateTour)
  .delete(tourcontroller.deleteTour);

module.exports = router;
