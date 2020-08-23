-- Write a query that shows all flights going to Shannon
SELECT i_destination.name AS destination,
  all_flights.airline,
  all_flights.aircraft,
  all_flights.pilot_first_name,
  all_flights.pilot_last_name,
  all_flights.flight_number,
  all_flights.serial_number,
  all_flights.craft_type,
  all_flights.freight,
  all_flights.departure,
  all_flights.arrival
FROM (
    SELECT p_airline.name AS airline,
      null AS aircraft,
      i_pilot.first_name AS pilot_first_name,
      i_pilot.last_name AS pilot_last_name,
      f_airline.flight_number AS flight_number,
      null AS serial_number,
      null AS craft_type,
      null AS freight,
      f_airline.destination_id,
      f_airline.departure,
      f_airline.arrival
    FROM flight.airline AS f_airline
      INNER JOIN plane.airline AS p_airline ON f_airline.airline_id = p_airline.id
      INNER JOIN info.pilot AS i_pilot ON f_airline.pilot_id = i_pilot.id
    UNION ALL
    SELECT p_airline.name AS airline,
      null AS aircraft,
      null AS pilot_first_name,
      null AS pilot_last_name,
      f_freight.flight_number AS flight_number,
      null AS serial_number,
      null AS craft_type,
      i_freight.type AS freight,
      f_freight.destination_id,
      f_freight.departure,
      f_freight.arrival
    FROM flight.freight AS f_freight
      INNER JOIN plane.airline AS p_airline ON f_freight.airline_id = p_airline.id
      INNER JOIN info.freight AS i_freight ON f_freight.freight_id = i_freight.id
    UNION ALL
    SELECT null AS airline,
      p_aircraft.type AS aircraft,
      i_pilot.first_name AS pilot_first_name,
      i_pilot.last_name AS pilot_last_name,
      null AS flight_number,
      p_aircraft.serial_number AS serial_number,
      null AS craft_type,
      null AS freight,
      f_aircraft.destination_id,
      f_aircraft.departure,
      null AS arrival
    FROM flight.aircraft AS f_aircraft
      INNER JOIN plane.aircraft AS p_aircraft ON f_aircraft.aircraft_id = p_aircraft.id
      INNER JOIN info.pilot AS i_pilot ON f_aircraft.pilot_id = i_pilot.id
  ) AS all_flights
  INNER JOIN info.destination AS i_destination ON all_flights.destination_id = i_destination.id
WHERE i_destination.name = 'Shannon';