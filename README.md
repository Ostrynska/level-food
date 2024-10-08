# 📎 LEVEL FOOD

The app is built with Next.js. Level Food is a platform for foodies to share their favourite recipes. It is a place to discover new dishes and to communicate with other food lovers.  </br>
A Next.js project developed as part of the "Next.js & React - The Complete Guide" course on Udemy.

![Level Food App](https://res.cloudinary.com/dcjlswtup/image/upload/v1728377578/Screenshot_2024-10-08_at_11.52.39_jc5au9.png)

## Technologies & Dependencies
| **Tool**            | **Description**                                  |
|---------------------|--------------------------------------------------|
| **Next.js**         | React framework                                  |
| **React**           | JavaScript library for building user interfaces  |                   
| **AWS**             | Cloud services platform                          |            

## Getting Started
To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. You can start editing by modifying `app/page.tsx`, and the changes will auto-update.

This project utilizes `next/font` to optimize and load the Inter Google Font.

## Folder Structure
The folder structure is based on a Next.js Boilerplate.

```
Pongo/
├── public/
└── src/
   ├── app/
   │   ├── (home)
   │   ├── community
   │   └── ...
   ├── assets/
   ├── components/
   │   ├── image-picker/
   │   ├── nav-link/
   │   └── ...
   ├── hooks/
   ├── lib/
   ├── models/
   ├── styles/
   │   └── globals.css
   ├── utils/
   └── tests/
```

### Folder Descriptions
- `public/`: Static assets like images, fonts, and icons.
- `app/`: Application routing; files correspond to routes.
- `components/`: Reusable React components.
- `hooks/`: Custom React hooks for reusable logic.
- `lib/`: Third-party integrations and project-specific library code.
- `models/`: Data models and schemas for database or API integration.
- `styles/`: Global stylesheets and component CSS modules.
- `utils/`: Utility functions used across the app.
- `tests/`: Unit and integration tests for application reliability.

## Learn More
- [Next.js Documentation](https://nextjs.org/docs) - Explore Next.js features and APIs.
- [Next.js Tutorial](https://nextjs.org/learn) - Interactive guide to get started with Next.js.
