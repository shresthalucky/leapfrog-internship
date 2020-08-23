-- Update all flights in January 2016 that have a destination of Le Touquet so that they now are going to Lydd.
UPDATE flight.airline AS f_a
SET destination_id = i_d.id
FROM info.destination AS i_d
WHERE i_d.name = 'Le Touquet'
  AND f_a.destination_id = (
    SELECT id
    from info.destination
    WHERE name = 'Lydd'
  )
  AND to_char(f_a.departure, 'YYYY-MM') = '2016-01';
UPDATE flight.aircraft AS f_a
SET destination_id = i_d.id
FROM info.destination AS i_d
WHERE i_d.name = 'Le Touquet'
  AND f_a.destination_id = (
    SELECT id
    from info.destination
    WHERE name = 'Lydd'
  )
  AND to_char(f_a.departure, 'YYYY-MM') = '2016-01';
UPDATE flight.freight AS f_a
SET destination_id = i_d.id
FROM info.destination AS i_d
WHERE i_d.name = 'Le Touquet'
  AND f_a.destination_id = (
    SELECT id
    from info.destination
    WHERE name = 'Lydd'
  )
  AND to_char(f_a.departure, 'YYYY-MM') = '2016-01';