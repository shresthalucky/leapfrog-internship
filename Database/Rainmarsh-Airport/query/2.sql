-- Write a query that selects the flights carrying medical supplies
SELECT f_f.flight_number,
  p_a.name AS airline,
  i_d.name AS destination,
  f_f.flight_number,
  f_f.departure,
  f_f.arrival
FROM flight.freight AS f_f
  INNER JOIN info.freight AS i_f on f_f.freight_id = i_f.id
  INNER JOIN info.destination AS i_d on f_f.destination_id = i_d.id
  INNER JOIN plane.airline AS p_a on f_f.airline_id = p_a.id
WHERE i_f.type = 'Medical Supplies';