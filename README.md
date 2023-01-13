# Musicalia

[App Site Link](https://musicalia-.glitch.me//)

## Description

Small fullstack music app with basic CRUD operations and API usage made with Node.js, Express, MongoDB/Mongoose, EJS and CSS.

## Navigation

**MAIN PAGE**

As home page loads, contet from newsAPI is fetched via **proxy server** and displayed as hyperlink articles. Default query parameter is the same as the one in "music" button.

YT buttons next to covers redirect user to youtube > search > 'clicked object name/title'.

**ADD NEW ARTIST/SONG**

User can add artists and songs. Filling all(!) inputs with proper data is required to save object in the database.

- Name, Artist, Title > String
- Genre > String
- Rating > 1-10 Numbers
- Cover > jpg. file

**SEE ALL ARTIST/SONG**

Search inputs were made with regex and mongodb methods.

**EDIT AND DELTE**

Deleting artists from database is only possible if there is no songs reletad to certain artist. Trying to do it will result in error message displayed. Using delete and edit buttons will show prompt asking if the user is sure about this action.
