# React + Vite + TanStack Router

## Install

- `npm create -- tsrouter-app@latest tanstack-router --framework React --interactive`
- cd into `tanstack-router` and run `npm i`
- From there install the query framework from tanstack - `npm i @tanstack/react-query`
- We will also use the react-icons, so `npm i react-icons`
- We are using Axios as our api engine, so `npm i axios`
- We will use debounce to wait for recommended users during typing, so `npm i use-debounce`
- We will use toast notifications from Sonner, so `npm i sonner`
- You will need to use the custom index.css - `./index.css`

## Configuration

- Update the `main.jsx` to wrap the query framework around the application
- Will need access to the secrets from Settings > Secrets and variables to build the `.env`
