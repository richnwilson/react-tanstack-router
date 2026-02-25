# React + Vite + TanStack Router

## Install

- `npm create -- tsrouter-app@latest tanstack-router --framework React --interactive`
- cd into `tanstack-router` and run `npm i`
- We are using Axios as our api engine, so `npm i axios`
- Using json-server to replicate API data calls, so `npm i -D json-server`
- Will be also use the Tanstack query library in addition to router loaded, so `npm i @tanstack/react-query`

## Configuration

- You will need to use the Git Bash terminal and not Powershell as there are permission issues when creating a new folder based index.tsx. When you start the server `npm run dev` in Git bash and then create a routes > folder > index.tsx it will populate with the right code :)

## Starting

- Run `npm run dev` to start router
- Run `npm run json-server` to start JSON data access via API

## Setup

- You can just create folder based routes / paths in the `src/routes` folder and add an `index.tsx` in each - should build code automatically. Will also add these paths to the `routeTree.gen.ts`
- Add 'default' custom head and meta tags to `src/routes/__root.tsx`. For specific meta and head tags, create same head key in specific pages `index.tsx`
- Can use the `loader` method in createFileRoute of a specific route to make API call and return data, OR, can also use TanStack query which is more powerful but more involved i.e. prefetching, retries, offline etc
- For tanStack query, need to configure `src/main.tsx` and `src/routes/__root.tsx`
- See example of integration in the `src/routes/ideas` folder and subfolders
- We will also use the TanStack query mutation to add and delete ideas
