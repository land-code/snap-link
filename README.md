# Snap link
Snap link is a simple url shortener. It uses:
- **Astro**. It is the JavaScript framework
- **Firebase**. It is used for authentication
- **Astro DB**. It is the users and links database. Only the server can read, update, delete and create on it.
- **Cypress**. It is being used to test e2e the app before making a deploy.
- **Tailwind CSS**. It is a styles framework which uses the class attribute to apply directly apply styles to elements.
-  **Vercel Adaptar**. It adapts Astro to generate dynamic routes and endpoints, which are deployed in Vercel.

## Setup
> [!NOTE]
> You can use `npm` if you want, but the PR should upload the `pnpm-lock.yaml` to work with our CI. 
- Install dependencies:
  ```bash
  pnpm install
  ```
- Run your project:
  ```bash
  pnpm run dev
  ```
  
