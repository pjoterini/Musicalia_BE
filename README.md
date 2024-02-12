# Musicalia

[Application Preview](https://hellomusicalia.vercel.app/)
[Frontend code](https://github.com/pjoterini/Musicalia_FE)

## Description

Fullstack application in which you can store artists and songs with images.

PREVIOUSLY views were implemented with EJS and CSS. Source code for this solution can be found under '0.MPA_with_EJS' folder in root directory(Musicalia_BE repository).

## Navigation

**MAIN PAGE**

As home page loads, contet from newsAPI is fetched and displayed as hyperlink articles. Default query parameter is the same as the one in "music" button.

Card covers redirect users to youtube > search > 'clicked object name/title'.

**ADD NEW ARTIST/SONG**

User can add artists and songs. Filling all inputs with proper data is required to save object in the database.

- Name, Artist, Title > String
- Rating > Number
- Cover > jpg. file

**EDIT AND DELTE**

Deleting artists from database is only possible if there is no songs reletad to certain artist. Using delete buttons will show prompt asking if the user is sure about this action.

## STACK

Node.js • Express • MongoDB/Mongoose • React.js
