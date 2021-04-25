# Queue Here

Manage and make restaurant reservations. Fullstack solution by using React, Nodejs, and MongoDB.

## PROBLEM

Physically queuing at restaurants is time consuming and dangerous during the Covid-19 pandemic. 
Some diners would like to make a phone call before heading to the restaurants, but sometimes no one answers the phone call, especially during peak hours. 
How to manage queues for restaurants is also a problem faced by the restaurant owners every day. Both diners and restaurant owners need a digital solution to help them solve this problem.

## SOLUTION

QueueHere is a digital solution that helps people to manage and make restaurant reservations. This platform will convert time intervals to available time slots and check whether the desired dining number is available. So users could know if the dining slots are available, before physically going to the restaurant. All the booking procedures could be done by using the QueueHere platform, and it could significantly reduce queuing time.

### For diners
* Save queuing time
* Simple and clear reservation procedures
* Do not need to manually check restaurants' operating time
* Manage multiple reservations in advance
### For restaurant owners
* Avoid conflicting reservations
* Flexible system to fit restaurants' specific needs

## TECHNOLOGIES
### Frontend
* React: popular and light weight framework, easy to seperate the features into different modules and components, the power of React hooks
### Backend
* Nodejs: fast development for small project
* MongoDB Atlas: in cloud database which is easy to use

## GETTING STARTED

### Server side, default port is 8080

```
$ cd ./queuing_server
$ npm install
$ npm start
```

### Client side, default port is 3000

```
$ cd ./queuing_client
$ npm install
$ npm start
```

### Features

#### Restaurant owners

- Register and login as owner
- User can add a new restaurant, time slot is the key feature of this platform. (owner can add multiple interval for each day of week). Can also tick open on public holiday checkbox.
- User can edit the existing restaurant

#### Diners

- Register and login as diner
- Add a new booking, click the Add Booking button and proceed to select restaurant page, choose one and proceed to booking page.
- Add a new booking, once you select a reservation date, the system will check the available time slots and diner can choose one of them. If reservation date is on public holiday and the restaurant does not open on public holiday. It will not show any time slots. If the dining number is more than the accumulated dining number at that time slot, that time slot will be grey out.
- Edit the existing booking.

#### Recap: Key features highlight

- Convert time interval to time slots
- Check the existing dining number at time slot
- Check whether the restaurant is open on public holiday
