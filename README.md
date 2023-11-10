# User manager demo

This is just a small demo project to demonstrate my skills with Spring Boot and React. Use with your own responsiblity.

## Prerequisite (or at least proven to work with these versions)
- Node.js v20.9.0
- yarn 1.21.1
- docker-compose version 1.29.2
- Java 17.0.5

Development has been done on a Linux environment, not tested on other environment.

## How to run without bundling the code
1. Run `docker-compose up` on user-manager-demo-dev-db to set up the database. Don't close the terminal window.
2. Run `./mvnw clean install` and `./mvnw spring-boot:run` on user-manager-demo-backend. Don't close the terminal window.
3. Run `yarn install` and `yarn dev` on user-manager-demo-frontend. Don't close the terminal window.
4. Open your web browser, go to http://localhost:5173/
5. To fill the application with test data, run `curl -XPOST localhost:8080/api/users/reset-all` (not in the UI on purpose).
6. Happy testing!

If needed, this code will be set run on Internet.
