<p align="center">
  <img src="https://cdn.atyantik.com/Astroflare.webp" alt="Astroflare" width="200" style="border-radius: 20px;"
  >
</p>

# **Astroflare**

Astroflare is a scalable and modular monorepo ecosystem for building modern, edge-first web applications using **Astro** and **Cloudflare Workers**. It’s designed to simplify the development of performant, globally distributed applications while promoting code reusability and maintainability.

This project is supported and sponsored by [Atyantik Technologies](https://atyantik.com/). 🚀

---

## **Table of Contents**
- [Features](#features)
- [Current Structure](#current-structure)
- [Future Scope](#future-scope)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [About Atyantik Technologies](#about-atyantik-technologies)

---

## **Features**

- 🌍 **Edge-Optimized**: Seamless integration with Cloudflare Workers for fast, globally distributed applications.
- ⚡ **Astro-Powered**: Build blazing-fast web applications using Astro’s island architecture.
- 🛠️ **Monorepo Design**: Manage multiple apps and packages efficiently within a unified structure.
- 🎯 **TypeScript First**: Type-safe development for robust, scalable codebases.
- 📦 **Future-Proof**: Designed to evolve with support for additional services and apps.

---

## **Current Structure**

Astroflare is currently focused on providing:
- A **web application** built with Astro.
- A basic structure for future apps and services.

### **Directory Layout**

```
astroflare/
├── apps/
│   └── web/              # Astro-based frontend (@apps/web)
├── packages/
│   └── db/               # Database schema and utilities (@services/db)
├── turbo.json            # Turborepo configuration
├── tsconfig.json         # Shared TypeScript configuration
└── README.md             # Project overview
```

### **Available Packages**

| Package         | Description                                     |
|------------------|-------------------------------------------------|
| `@apps/web`      | The primary web frontend built with Astro.      |
| `@services/db`   | Database utilities and schema for the project. |

---

## **Future Scope**

Astroflare is designed with extensibility in mind. Future plans include:
- **New Applications**:
  - `@apps/api`: Cloudflare Worker-based API services.
- **Reusable Services**:
  - `@services/auth`: Authentication utilities and middleware.
  - `@services/utils`: Shared utility functions for applications.
  - Additional modular packages as needed.

These features will be introduced incrementally, and contributions are welcome!

---

## **Getting Started**

### **1. Clone the Repository**
```bash
git clone https://github.com/Atyantik/astroflare.git
cd astroflare
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Run the Development Server**
Start the web application:
```bash
npm run dev
```

### **4. Build for Local**
```bash
npm turbo build
```

### **5. Build for Production**
```bash
npm turbo build:production
```

### **5. Deploy to Cloudflare Workers**
Although the repo currently doesn’t include Cloudflare Workers apps, the structure is ready for future deployments.

---

## **Configuration**

### **App-Specific Configuration**
Each app or package may have its own configuration file. For example:
- **`apps/web`:** Astro's configuration is defined in `astro.config.mjs`.
- **`servces/db`:** Database configurations are handled internally.

---

## **Contributing**

We’re building Astroflare to support modern, scalable web development. Contributions are welcome to help improve its features and extend its scope.

### **How to Contribute**
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **License**

Astroflare is licensed under the [MIT License](LICENSE).

---

## **About Atyantik Technologies**

Astroflare is proudly supported and sponsored by **[Atyantik Technologies](https://atyantik.com)**, a leading software development company specializing in scalable web applications, cloud services, and cutting-edge technologies.

### **Contact Atyantik**
- 🌐 [Website](https://atyantik.com)
- 💼 [LinkedIn](https://linkedin.com/company/atyantik-technologies/)
- 🐦 [Twitter](https://twitter.com/atyantik_tech)

<p align="center">
  <img src="https://cdn.atyantik.com/atyantik-logo.png" alt="Atyantik Technologies" width="200">
</p>

---

Astroflare – Simplifying Edge-First Development with Cloudflare 🌍✨

---

### **Feedback and Support**

If you have suggestions or run into issues, please [open an issue](https://github.com/Atyantik/astroflare/issues) or contact us directly. We value your feedback and contributions!