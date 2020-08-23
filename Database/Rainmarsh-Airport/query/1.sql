-- Write a query that selects all the passengers for flight LA3456.
WITH passenger AS (
  SELECT i_p.first_name,
    i_p.last_name,
    i_p.ref_no,
    i_p.sex,
    i_p.nationality_id,
    to_char(i_p.dob, 'dd/mm/yy') AS dob
    FROM info.passenger AS i_p
  WHERE id IN (
      SELECT passenger_id
      FROM flight.passenger AS f_p
        INNER JOIN flight.airline AS f_a ON f_p.flight_id = f_a.id
      WHERE f_a.flight_number = 'LA3456'
    )
)
SELECT p.first_name,
  p.last_name,
  c.nationality,
  p.ref_no,
  p.sex
FROM passenger AS p
  INNER JOIN info.country AS c ON p.nationality_id = c.id;