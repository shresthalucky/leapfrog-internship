-- Update the records for private flight C786 so that the pilot is now listed as ‘Paul Stow’.
UPDATE flight.aircraft
SET pilot_id = (
    SELECT id
    FROM info.pilot
    WHERE first_name = 'Paul'
      AND last_name = 'Stow'
  )
WHERE aircraft_id = (
    SELECT id
    FROM plane.aircraft
    WHERE serial_number = 'C786'
  );