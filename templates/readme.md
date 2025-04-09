# 🚀 create-express-app

A simple CLI to scaffold an Express.js project with optional features like `dotenv`, `morgan`, ESLint, Docker, and `@/` aliasing.

---

## 📦 Installation

Install globally using npm:

```bash
npm install -g create-express-docker-app

🛠 Usage
Run the CLI to generate a new Express app:
create-express-docker-app

You'll be prompted with a few questions:

📁 Project name

🌍 Use .env file?

📊 Add Morgan for request logging?

🐳 Use Docker for deployment?

✅ Use ESLint for code linting?

📌 Set up @/ as alias to src/?

⚙️ Auto-install dependencies?


📁 Generated Project Structure (based on your choices)
my-app/
├── src/
│   └── index.js         # Express app entry
├── .env                 # Optional
├── .eslintrc.json       # Optional
├── .gitignore
├── .prettierrc
├── Dockerfile           # Optional
├── jsconfig.json        # Optional path alias config
├── package.json
└── README.md


✅ Example
npx create-express-docker-app

? Project name? my-express-app
? Do you want to use an environment file? Yes
? Do you want to use morgan for logging? Yes
? Do you want to use Docker for deployment? No
? Do you want to use ESLint for code linting? Yes
? Do you want to set @/ as src path alias? Yes
? Do you want to auto-install dependencies? Yes

Then:
cd my-express-app
npm start

Your Express app will be running on http://localhost:3000

💡 Scripts
"scripts": {
  "dev": "node src/index.js",
  "start": "node src/index.js" // or docker command if Docker was chosen
}

📄 License
MIT © Warisamir


---

Let me know if you want to add badges, demo GIFs, or publish instructions too.
