## Summary
This repository is the solution of the task that is below.
The idea is to practice React, Node.js and DB skills.

## The task
Develop a simple system for tracking Github projects (public). The above system should contain user registration and authorization. The user should be able to register using email and password. After sign-in, the user navigates to the list of projects (just table view) which contains the next data:

- project owner
- project name
- project URL
- count of stars
- count of forks
- count of issues
- created date as UTC Unix timestamp
- Buttons: update and delete

For adding a Github repository, the user should pass only a Github repo path, like:
user/repository.
After adding, the system should in the background request data from the GitHub API and write all required fields to the database.

## Usage
For now u can use db-init.sql file to create db structure
