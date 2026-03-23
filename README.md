<p align="center"><img src="public/icons/logo.svg" width="128" height="128" alt="CodeScribe Logo"></p>

# CodeScribe — AI Code Documentation Generator

![Version](https://img.shields.io/badge/version-1.0.0-10B981)
![License](https://img.shields.io/badge/license-ISC-green)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

> Generate JSDoc comments, README files, API documentation, architecture analyses, and changelogs from any GitHub, GitLab, or Bitbucket repository — right from your browser.

---

## Features

- :memo: **JSDoc Generation** — Automatically generate JSDoc/TSDoc comments for functions, classes, and modules
- :book: **README Generator** — Create comprehensive README files with badges, usage, and API sections
- :globe_with_meridians: **API Documentation** — Generate endpoint documentation from route files and controllers
- :building_construction: **Architecture Analysis** — Visualize project structure, dependencies, and design patterns
- :scroll: **Changelog Generator** — Auto-generate changelogs from commit history and PR descriptions
- :octocat: **GitHub Integration** — Extract code and repository data directly from GitHub pages
- :fox_face: **GitLab Integration** — Full support for GitLab repositories and merge requests
- :bucket: **Bitbucket Integration** — Works with Bitbucket Cloud repositories
- :keyboard: **JetBrains Mono Font** — Developer-optimized monospace typography throughout the UI
- :green_heart: **Green/Emerald Theme** — Fresh, developer-friendly UI with emerald accents

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Vite** | Build tool & dev server |
| **Firebase** | Authentication & document storage |
| **JetBrains Mono** | Monospace font for code display |
| **Chrome Extensions API** | Browser integration & code extraction |

---

## Installation

### From Source

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/repodoc-ext.git
   cd repodoc-ext
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load into Chrome**
   - Open `chrome://extensions/`
   - Enable **Developer mode** (top right)
   - Click **Load unpacked**
   - Select the `dist/` folder

### Development Mode

```bash
npm run dev
```
Starts the Vite development server.

---

## Usage

### Generating JSDoc
1. Navigate to a **source file** on GitHub, GitLab, or Bitbucket
2. Open the **CodeScribe** side panel
3. The extension extracts the file's code automatically
4. Click **Generate JSDoc** to create documentation comments
5. Copy the documented code or download as a file

### Creating a README
1. Navigate to a **repository root** on any supported platform
2. Open CodeScribe and select **README Generator**
3. The extension analyzes the repo structure, dependencies, and existing docs
4. Review and edit the generated README
5. Copy to clipboard or download as `README.md`

### API Documentation
1. Navigate to route or controller files in your repository
2. Select **API Docs** from the generation options
3. CodeScribe identifies endpoints, parameters, and response types
4. Generates formatted API documentation with examples

### Architecture Analysis
1. Open CodeScribe on any repository page
2. Select **Architecture Analysis**
3. View:
   - Project structure tree
   - Dependency graph
   - Design pattern identification
   - Module relationship mapping

### Changelog Generation
1. Navigate to a repository's commit history or releases page
2. Select **Changelog** from CodeScribe
3. The extension parses commits, groups them by type (features, fixes, breaking changes)
4. Generates a formatted changelog following Keep a Changelog conventions

---

## Architecture

```
repodoc-ext/
├── src/
│   ├── popup/              # Extension popup UI
│   ├── sidepanel/          # Full documentation workspace
│   ├── background.ts       # Service worker & code processing
│   ├── content/            # Content scripts for GitHub/GitLab/Bitbucket
│   ├── shared/             # Shared utilities, types, constants
│   └── utils/              # Code parsing & documentation helpers
├── public/
│   └── icons/              # Extension icons (16, 48, 128px)
├── dist/                   # Built extension output
├── vite.config.ts          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── manifest.json           # Chrome extension manifest
```

---

## Screenshots

<p align="center">
  <img src="public/icons/logo.svg" alt="CodeScribe Logo" width="128" height="128" />
</p>

| Icon | Path |
|---|---|
| SVG Logo | `public/icons/logo.svg` |
| 16x16 | `public/icons/icon16.png` |
| 48x48 | `public/icons/icon48.png` |
| 128x128 | `public/icons/icon128.png` |

---

## License

ISC
