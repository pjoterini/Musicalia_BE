# Musicalia

[App PREVIEW](https://hellomusicalia.vercel.app/)

## Description

Fullstack music application with CRUD operations and API usage made with Node.js, Express, MongoDB/Mongoose and React.js as frontend.

PREVIOUSLY views were implemented with EJS and CSS. Source code for this solution can be found under '0.MPA_with_EJS' foler in root directory(Musicalia_BE repository).

## Navigation

**MAIN PAGE**

As home page loads, contet from newsAPI is fetched and displayed as hyperlink articles. Default query parameter is the same as the one in "music" button.

Card covers redirect users to youtube > search > 'clicked object name/title'.

**ADD NEW ARTIST/SONG**

User can add artists and songs. Filling all inputs with proper data is required to save object in the database.

- Name, Artist, Title > String
- Rating > Number
- Cover > jpg. file

<!-- **SEE ALL ARTIST/SONG**

Search inputs were made with regex and mongodb methods. -->

**EDIT AND DELTE**

Deleting artists from database is only possible if there is no songs reletad to certain artist. Using delete buttons will show prompt asking if the user is sure about this action.
