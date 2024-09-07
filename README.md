# FPL-Badgers
https://fpl-badgers.vercel.app/

*README last updated: Sept 2024*

![Badgers-laptop-preview](https://github.com/user-attachments/assets/63d39577-5e79-4322-add4-53451d0e67cf)

## ⚽️ Site Description
FPL-Badgers is a web app made to collect data from the official FPL site and display in a more personable UI in relation to a league amongst friends. 

### Creation story
It was originally created as we had a two-tier league system (with promotion and relegation) but the official FPL site doesn’t allow you to view leagues you are not part of. To overcome this, I created this app which displayed the two leagues so members of each league could see all the information. 

As of the 2024-25 season, the league was reduced to one league and now we are looking at other features to add use-cases.

## ⚽️ Repo Description
The repo has both client and server directories. The server was created as a proxy server to avoid CORS errors but now, only the client directory is used with reverse CORS to call the endpoints. This means that server directory has not been maintained since 2023, but is kept incase it becomes necessary to return to that approach. 

## ⚽️ Set-up 
### Development
To start the app in development mode on localhost, enter the client directory and run:
```
cd client
npm start
```

### Production
The application is hosted on Vercel, and each push to master is pushed to production as CI/CD.

## ⚽️ Pages & Features
- **Home**
  - Displays stats about the most recent gameweek (highest and lowest scorer) and current table positions.
- **H2H League**
  - Displays the Badgers H2H League table. The Table is sortable by points if you click the points column header.
- **Points League**
  - Displays the Screwfix Points League table.
- **Fixtures/Results**
  - Displays all gameweek results (including awards)
  - Displays manager/team form information for the gameweek after the active one
