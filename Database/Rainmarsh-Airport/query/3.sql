-- Write a query that selects all the passengers who have not checked in baggage for flight LA3456.
SELECT DISTINCT i_p.first_name,
  i_p.last_name,
  i_p.ref_no,
  i_p.sex,
  f_a.flight_number
FROM flight.passenger AS f_p
  INNER JOIN flight.airline AS f_a ON f_p.flight_id = f_a.id
  INNER JOIN info.passenger AS i_p ON f_p.passenger_id = i_p.id
WHERE f_p.baggage_check = 'N'
  AND f_a.flight_number = 'LA3456';