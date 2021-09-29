# sharex-upload-server

> **Warning**: This project is still a work-in-progress (you can see the TODOs below). Because of this, I am not responsible for any damages that are caused to your infastructure/system. You can report bugs [here](https://github.com/davidilie/sharex-upload-server).

ShareX Upload Server is an app made to support sharing images, files and text snippets using [ShareX](https://getsharex.com/) or from the website directly, built using [NextJS](https://nextjs.org), [TailwindCSS](https://tailwindcss.com), and [Express.js](https://expressjs.com) for the backend.

The goal of ShareX Upload Server as opposed to other alternatives is to allow anyone with basic technical knowledge to be able to set this up for themselves. You can see more information about that in the [deployment](/deployment) section.

## Features

-   Written with a modern stack ensuring best performance in production
-   Written with typescript :)
-   Express.js backend with support for Image, File, Text uploads and much more
-   Next.js frontend with
    -   Easily create API keys for **specific** parts of the API
    -   Intuitive interface (works both on desktop and mobile)
    -   Dark/Light mode support
-   `docker-compose` or `ansible` configurations available in [deployment](/deployment)

## TODO:

general:

-   wiki
-   implement adding new users
-   implement deleting of accounts

backend:

-   add support for other providers (s3)

frontend:

nothing atm :)
