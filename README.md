[![Main Logo](frontend/src/assets/Davescord-logo.svg)](https://davescord.onrender.com/)

__Background__
----

Davescord is a clone of Discord, a communication platform in which users can build their own servers and channels to have organized discussions about any topic they are interested in. The major functionality of being able to communicate in near real time was written in two weeks.

__Technologies, Libraries, and APIs__
----
- Ruby on Rails Backend
- React and Redux Frontend
- PostgreSQL Database
- WebSockets via Action Cable
- HTML
- CSS

__Key Features__
----

Using Davescord, users can:
- Create their own account and log in securely
- Create, read, update, and destroy their own servers and channels within their own servers
- Create, read, update, and destroy messages in servers they are subscribed to
- See changes to their subscribed servers in real time, including message posts, message edits, message deletion, and more.

__Code Snippets__
----



__Server Creation__

Any user who is logged in has the option to create their own server. The UI prevents users from creating a server with no name. Upon creation of the server, the user is automatically subscribed to the server and a default general channel is created so they can start sending messages immediately.

```

```

__Channel Creation and Editing__

As the owner of a server, users will have the option either add a new channel to a server or edit any of the channels they have created within a server. The UI allows for quick access to channel edits while the user is inside the server

```

```

__Live Communication__


```

```

__Future Plans:__
----
- Store images related to user profiles and server images via AWS
- Add a friend request system as well as the ability to send private messages to other users
- Create a robust server invite system which allows server subscribers to create invitation links which have expiration dates
