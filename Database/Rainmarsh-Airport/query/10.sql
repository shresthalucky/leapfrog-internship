-- Delete all private flights for the date of 03 January 2016.
DELETE FROM flight.aircraft
WHERE to_char(departure, 'DD-MM-YYYY') = '03-01-2016';