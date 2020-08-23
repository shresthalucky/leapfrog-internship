-- Update the record for Chaz Smith so that his nationality is now listed as French.
UPDATE info.passenger AS p
SET nationality = c.id
FROM info.country AS c
WHERE c.nationality = 'French'
  AND p.first_name = 'Chaz'
  AND p.last_name = 'Smith';