CREATE TABLE IF NOT EXISTS diagrams(
    "id" SERIAL primary key,
    "name" varchar(255) NOT NULL UNIQUE,
    "in_house" BOOLEAN DEFAULT FALSE,
    "is_processed" BOOLEAN DEFAULT FALSE
)