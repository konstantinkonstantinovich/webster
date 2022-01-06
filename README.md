# webster

Simple service for graphic design. Even if you doesn't have design skills for creating and processing images,you will certainly acquire them in our editor

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

![npm](https://img.shields.io/badge/php-^7.3|^8.0-blue)
![npm](https://img.shields.io/badge/laravel-^8.75-red)

## Installation

To install composer packages run:
  ```sh
  composer install --ignore-platform-reqs
   ```
## Configuration


To connect mysql, start the server and create a database using the following command:

  ```mysql
  CREATE DATABASE webster;
  ```   

After that make migration running:
  ```sh
php artisan migrate
   ```



To create jwt secret key run:
```sh
php artisan jwt:secret
 ```
 You can see the token in `.env` file


## Start

To start artisan server run:
```sh
php artisan serv
 ```
