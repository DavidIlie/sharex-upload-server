# sharex-media-server

work in progress highly customizable sharex media server with a Express API and a Next.js frontend. Everything is written with Typescript :)

## TODO:

backend:

-   make content actually viewable after its added
-   add/fix the remaining functions
    -   image
    -   text
    -   file
-   add support for both minio or direct storage (only minio is working now)
-   authentication system for user(s) with email/password auth (typeorm)
    -   ability create API keys for specific tasks (and then use that to authenticate when adding new images/etc)
        -   permissions system for api keys

frontend:

-   actually create frontend lol
