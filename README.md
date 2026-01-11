# 🚀 Portfolio - Carmelo La Mantia

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

> 🎨 A modern, responsive single-page portfolio showcasing my skills, projects, and professional experience.

---

## ✨ Features

- 🦸 **Hero Section** — Personal introduction with profile photo
- 💼 **Skills Showcase** — Interactive skill cards with progress bars (Front-End, Back-End, Tools, Soft Skills)
- 🚀 **Projects Gallery** — Portfolio grid with hover effects and GitHub/Demo links
- 📜 **Work Experience** — Carousel slider displaying professional background
- 📬 **Contact Form** — WhatsApp integration for direct messaging
- 📱 **Fully Responsive** — Mobile-first design with hamburger menu
- 🎨 **Modern UI** — Clean purple gradient theme with smooth animations

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | ![React](https://img.shields.io/badge/-React_18-61DAFB?style=flat-square&logo=react&logoColor=black) |
| **Styling** | ![Bootstrap](https://img.shields.io/badge/-Bootstrap_5-7952B3?style=flat-square&logo=bootstrap&logoColor=white) ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) |
| **Icons** | ![React Icons](https://img.shields.io/badge/-React_Icons-E91E63?style=flat-square&logo=react&logoColor=white) |
| **Carousel** | React Slick |
| **Contact** | WhatsApp API |

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/MeloLM/portfolio.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm start
```

The app will run at `http://localhost:3000`

### 🔧 Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
My_Portfolio/
├── public/
│   ├── index.html
│   └── assets/
│       ├── icon/          # Technology & social icons
│       └── image/         # Profile & project images
│
├── src/
│   ├── App.js             # Root component
│   ├── App.css            # Global styles & CSS variables
│   │
│   ├── components/
│   │   ├── Hero.js        # Hero section
│   │   ├── Skill.js       # Skills container
│   │   ├── SkillCard.js   # Individual skill card
│   │   ├── SkillInfo.js   # Skill details panel
│   │   ├── Projects.js    # Projects grid
│   │   ├── ProjectCard.js # Project card with hover
│   │   ├── WorkExp.js     # Experience carousel
│   │   ├── ExpCard.js     # Experience card
│   │   ├── ContactMe.js   # Contact section
│   │   ├── ContactForm.js # WhatsApp form
│   │   ├── ContactCard.js # Contact method card
│   │   ├── Vnavbar.js     # Desktop navigation
│   │   ├── MobileNav.js   # Mobile menu overlay
│   │   └── Footer.js      # Footer with dynamic year
│   │
│   ├── style/             # Component-specific CSS files
│   │
│   └── utils/
│       └── data.js        # Centralized data (skills, projects, experience)
│
└── package.json
```

---

## 🎨 Customization

### Colors
Edit CSS variables in `src/App.css`:

```css
:root {
  --main-color: #a993fe;  /* Primary purple */
  --sec-color: #7e61e7;   /* Secondary purple */
}
```

### Content
Update your personal data in `src/utils/data.js`:
- `SKILLS` — Technical skills with proficiency percentages
- `PROJECTS` — Portfolio projects with descriptions
- `WORK_EXPS` — Work experience entries

---

## 📸 Screenshots

| Desktop | Mobile |
|---------|--------|
| *Coming soon* | *Coming soon* |

---

## 👤 Author

**Carmelo La Mantia**

[![GitHub](https://img.shields.io/badge/GitHub-MeloLM-181717?style=flat-square&logo=github)](https://github.com/MeloLM)
[![Email](https://img.shields.io/badge/Email-carmelo.la.mantia00%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:carmelo.la.mantia00@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+39_351_084_5851-25D366?style=flat-square&logo=whatsapp)](https://wa.me/393510845851)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ and ☕ by Carmelo La Mantia
</p>
