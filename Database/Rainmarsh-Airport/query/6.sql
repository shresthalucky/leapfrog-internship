-- Update the records for flight GF456 to a new departure time of 18.00 and a corresponding new arrival time given that the flight duration is the same.
UPDATE flight.airline
SET (arrival, departure) = (
    arrival + age(arrival, departure)::interval,
    departure::DATE + '18:00'::TIME
  )
WHERE flight_number = 'GF456';