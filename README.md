# DA-Lockers

This project is an initiative by the Student Council for managing locker rentals.

## Usage Guide

To ensure a smooth setup and avoid issues with Node modules, they are not included by default. However, for proper functionality, it is recommended to run the following commands:

```bash
npm init -y
npm install express mysql2 body-parser
```

These commands will initialize the project and install the necessary modules for the application to work correctly.

## Database Setup

For the database, I decided to use **phpMyAdmin** and **MySQL** for proper database management. The setup was done using **Docker containers** with the following commands

```bash
docker run -d --name mysql-container --network my-network -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=mydatabase -p 3306:3306 mysql
docker run -d --name phpadmin-container --network my-network -e PMA_HOST=mysql-container -e PMA_PORT=3306 -p 8080:80 phpmyadmin/phpmyadmin
```

The following columns have been defined in the `users` table:

```sql
CREATE TABLE `users` (
  `nombre` varchar(20) NOT NULL,
  `delega` varchar(20) NOT NULL,
  `DNI` varchar(9) NOT NULL,
  `ntaquilla` int NOT NULL,
  `opciones` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```
