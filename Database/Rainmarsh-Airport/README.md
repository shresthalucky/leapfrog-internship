# Database Assignment
**Schemas and Tables:**
- info
  - country
  - destination
  - freight
  - pilot
  - passenger
- plane
  - aircraft
  - airline
- flight
  - aircraft
  - airline
  - freight
  - passenger


## Data Entry and Data Manipulation

- Create all the tables using SQL. Show your SQL scripts and the finished tables.
  [create.sql](create.sql)

```
$ psql <database> <user> -f create.sql
```
Populate tables with data (in order)
```
$ psql <database> <user> -f info/country.sql
$ psql <database> <user> -f info/destination.sql
$ psql <database> <user> -f info/pilot.sql
$ psql <database> <user> -f info/freight.sql
```

- Enter data on all the passengers shown in the assignment.
  [info/passenger.sql](passenger.sql)

```
$ psql <database> <user> -f info/passenger.sql
```

- Enter data for all the flights and their associated flights.
  [plane/](plane/)
  [flight/](flight/)

```
$ psql <database> <user> -f plane/airline.sql
$ psql <database> <user> -f plane/aircraft.sql

$ psql <database> <user> -f flight/aircraft.sql
$ psql <database> <user> -f flight/aircraft.sql
$ psql <database> <user> -f flight/freight.sql
$ psql <database> <user> -f flight/passenger.sql
```

- Write a query that selects all the passengers for flight LA3456.
  [1.sql](query/1.sql)

- Write a query that selects the flights carrying medical supplies.
  [2.sql](query/2.sql)

- Write a query that selects all the passengers who have not checked in baggage for flight LA3456.
  [3.sql](query/3.sql)

- Write a query that shows all flights going to Shannon.
  [4.sql](query/4.sql)

- Write a query that selects all the passengers for flight LA3456.
  [5.sql](query/5.sql)

- Update the records for flight GF456 to a new departure time of 18.00 and a corresponding new arrival time given that the flight duration is the same.
  [6.sql](query/6.sql)

- Update the records for private flight C786 so that the pilot is now listed as ‘Paul Stow’.
  [7.sql](query/7.sql)
  
- Update all flights in January 2016 that have a destination of Le Touquet so that they now are going to Lydd.
  [8.sql](query/8.sql)

- Update the record for Chaz Smith so that his nationality is now listed as French.
  [9.sql](query/9.sql)

- Delete all private flights for the date of 03 January 2016.
  [10.sql](query/10.sql)