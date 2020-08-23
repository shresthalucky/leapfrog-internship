-- Write a query that counts the number of flights in March 2016
SELECT count(*)
FROM (
    SELECT DISTINCT ON (flight_number) departure
    FROM flight.airline
    UNION ALL
    SELECT DISTINCT ON (flight_number) departure
    FROM flight.freight
    UNION ALL
    SELECT departure
    FROM flight.aircraft
  ) AS flights
WHERE to_char(flights.departure, 'YYYY-MM') = '2016-03';