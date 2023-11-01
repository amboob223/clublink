-- Create the 'club' database
CREATE DATABASE club;

-- Use the 'club' database
\c club;

-- Create the 'signup' table
CREATE TABLE pass(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);
-- Create the 'promo' table
CREATE TABLE promo(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    sections VARCHAR(255),
    club VARCHAR(255),
    phone VARCHAR(255),
    date VARCHAR(255),
    cost VARCHAR(255),
    pic BYTEA, -- Corrected 'bytea' data type
    description VARCHAR(255)
);

-- Create the 'user' table
CREATE TABLE "user"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255)
);
