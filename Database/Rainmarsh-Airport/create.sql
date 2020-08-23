CREATE SCHEMA info;
CREATE SCHEMA plane;
CREATE SCHEMA flight;
CREATE TABLE info.destination (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE info.country (
  "id" SERIAL PRIMARY KEY,
  "numeric_code" INTEGER NOT NULL UNIQUE,
  "alpha_2_code" CHAR(2) NOT NULL UNIQUE,
  "alpha_3_code" CHAR(3) NOT NULL UNIQUE,
  "name" VARCHAR(80) NOT NULL,
  "nationality" VARCHAR(80) NOT NULL
);
CREATE TABLE info.pilot (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(20) NOT NULL,
  "last_name" VARCHAR(20) NOT NULL
);
CREATE TABLE info.passenger (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(20) NOT NULL,
  "last_name" VARCHAR(20) NOT NULL,
  "address" VARCHAR(50) NOT NULL,
  "ref_no" VARCHAR(10) NOT NULL UNIQUE,
  "sex" VARCHAR(10) CHECK ("sex" IN ('Male', 'Female', 'Other')) NOT NULL,
  "nationality_id" INT REFERENCES info.country("id") ON DELETE CASCADE NOT NULL,
  "dob" DATE NOT NULL,
  "passport_number" VARCHAR(10) UNIQUE
);
CREATE TABLE info.freight(
  "id" SERIAL PRIMARY KEY,
  "type" VARCHAR(50)
);
CREATE TABLE plane.airline (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE plane.aircraft (
  "id" SERIAL PRIMARY KEY,
  "serial_number" VARCHAR(10) NOT NULL UNIQUE,
  "type" VARCHAR(50) NOT NULL
);
CREATE TABLE flight.airline (
  "id" SERIAL PRIMARY KEY,
  "airline_id" INT REFERENCES plane.airline("id") ON DELETE CASCADE NOT NULL,
  "destination_id" INT REFERENCES info.destination("id") ON DELETE CASCADE NOT NULL,
  "pilot_id" INT REFERENCES info.pilot("id") ON DELETE CASCADE NOT NULL,
  "flight_number" VARCHAR(10) NOT NULL,
  "departure" TIMESTAMP NOT NULL,
  "arrival" TIMESTAMP NOT NULL
);
CREATE TABLE flight.passenger (
  "id" SERIAL PRIMARY KEY,
  "flight_id" INT REFERENCES flight.airline("id") ON DELETE CASCADE NOT NULL,
  "passenger_id" int REFERENCES info.passenger("id") ON DELETE CASCADE NOT NULL,
  "baggage_check" CHAR(1) CHECK ("baggage_check" IN ('Y', 'N')) NOT NULL,
  "check_in" CHAR(1) CHECK ("check_in" IN ('Y', 'N')) NOT NULL,
  "baggage_label_number" VARCHAR(10)
);
CREATE TABLE flight.aircraft (
  "id" SERIAL PRIMARY KEY,
  "aircraft_id" INT REFERENCES plane.aircraft("id") ON DELETE CASCADE NOT NULL,
  "pilot_id" INT REFERENCES info.pilot("id") ON DELETE CASCADE NOT NULL,
  "destination_id" INT REFERENCES info.destination("id") ON DELETE CASCADE NOT NULL,
  "departure" TIMESTAMP NOT NULL
);
CREATE TABLE flight.freight (
  "id" SERIAL PRIMARY KEY,
  "freight_id" INT REFERENCES info.freight("id") ON DELETE CASCADE NOT NULL,
  "airline_id" INT REFERENCES plane.airline("id") ON DELETE CASCADE NOT NULL,
  "destination_id" INT REFERENCES info.destination("id") ON DELETE CASCADE NOT NULL,
  "flight_number" VARCHAR(20) NOT NULL,
  "departure" TIMESTAMP NOT NULL,
  "arrival" TIMESTAMP NOT NULL
);