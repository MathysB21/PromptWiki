![PromptWiki Landing](https://ibb.co/6WvnrLL)

# PromptWiki
PromptWiki is a React and Next.js-powered web application designed for enthusiasts of creative writing, AI prompts, and text generation. This platform allows users to explore, create, and favorite AI-driven prompts, offering a clean, intuitive interface for generating inspiration. Create an account, share prompts and have access to hundreds of well thought-out prompts at your fingertips.

Disclaimer: I built this as a project by following the guidance of JSMastery on YouTube. All of the code was manually typed, nothing was pulled or copied as this was an exercise to learn React and Next.JS. I, of course, added my own spice to the project by adding better search functionality, styling, favouriting and multi-tagging as features and extras to further demonstrate my understanding and sharpen my skills.

## Features
User Authentication: Secure login with Google OAuth for a personalized experience.
Prompt Creation and Saving: Easily create new prompts and save your favorites for later.
Explore Community Prompts: Browse prompts created by others to get inspired or contribute your own.
Responsive Design: Optimized for desktops and mobile devices.

## Tech Stack
Frontend: React, Next.js
Backend: MongoDB (Database), Supabase (Auth & BaaS)
Authentication: Google OAuth via NextAuth.js
Deployment: Hosted on Vercel

## Getting Started
To get a local copy of PromptWiki up and running, follow these steps.

### Prerequisites
Node.js
MongoDB (locally or cloud-based like MongoDB Atlas)
Supabase account for handling auth and storage

## Installation
Clone the repository

```bash
git clone https://github.com/MathysB21/promptwiki.git
cd promptwiki
```

### Install dependencies

```bash
Copy code
npm install
```

### Set up environment variables

Create a .env file in the root directory and add the following (replacing placeholders with actual values):

```plaintext
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Run the development server

```bash
Copy code
npm run dev
```

Open http://localhost:3000 to view it in the browser.

## Usage
Explore Prompts: Browse existing prompts from the community.
Sign In: Log in with your Google account to save and favorite prompts.
Create New Prompts: Add your own prompts for others to explore.

## Contributing
Contributions are welcome! If you'd like to help improve PromptWiki, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/AmazingFeature).
3. Commit your changes (git commit -m 'Add AmazingFeature').
4. Push to the branch (git push origin feature/AmazingFeature).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
Mathys Basson
GitHub | LinkedIn <!-- Optional: add LinkedIn or other contact details -->
![Email](mailto:pieterm.basson@gmail.com) ![LinkedIn](https://www.linkedin.com/in/mathys-basson-8b2730228/)
