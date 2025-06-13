## How to Run This Project

```bash
# 1. Clone the Repository
git clone https://github.com/EnarL/Cosmos-Odyssey.git

# 2. Navigate to the Root Directory
cd Cosmos-Odyssey

# 3. Run the Program with Docker
docker-compose up --build

# Frontend is running at:
# http://localhost:3000

# Backend is running at:
# http://localhost:5000

```

## Endpoints

<h3>Reservations </h3>

#### POST /reservations
Creates a new reservation.

#### GET /reservations
Retrieves all reservations.

#### GET /reservations/valid
Retrieves reservations where all bookings have currently valid pricelists.

<h3>Pricelists</h3>

#### GET /pricelists
Retrieves all pricelists.

#### GET /pricelists/valid
Retrieves pricelists that are currently valid (validUntil date is in the future).

#### GET /pricelists/invalid
Retrieves pricelists that are expired (validUntil date is in the past).

<h3>Travels</h3>

#### GET /travels
Retrieves all available travels.

#### GET /travels/valid
Retrieves travels that have currently valid pricelists (pricelists with a validUntil date in the future).

<br>

### I added the needed .env files because it's a demo and it simplifies the process of running the program 
