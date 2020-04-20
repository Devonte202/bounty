# bounty.io
#### A bounty board, where users put a bounty on rare items and goods (legal goods of course), and "Bounty Hunters" can claim them and fulfill the request by selling these items to users for the bounty (monetary compensation).

## Getting Started

### How to Install

To install clone this repo, then in your terminal run `npm install`

### How to Run

To run this app navigate to the root directory and run `npm start` in your terminal

### Notes

Before adding new code be sure to run `npx eslint fileName.js` and correct any errors before submitting a PR. 

### Link to the live project

https://bounty-io.herokuapp.com/

## Documentation

### Backend API Routes

##### To Register A New User

Send a `POST` request to the path `/api/register` with the body formatted as such:
```
body: {
    name: "Full name of user",
    email: "Email of user", // Must be shorter than 150 characters
    phone_number: "User's phone number", // Must be a string less than or equal to 11 characters
    address: "User's address",
    state: "User's state" // Must be a string less than or equal to 2 characters,
    zip: "User's zip code" // Must be a string less than or equal to 10 characters
    password: "User's password" // Will be encrypted,
    username: "User's username" //
}
```

##### To Login As A User

Send a `POST` request to the path `/api/login` with the body formatted as such:
```
body: {
    email: "Email of user",
    password: "User's password" 
}
```
##### To Logout As A User

Send a `GET` request to the path `/api/logout` with an empty body
