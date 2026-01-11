# CODE_CONTEXT.md
> AI-Optimized Project Reference | Min tokens, max context

---

## PROJECT_META
```yaml
type: single-page-portfolio
framework: React 18.2.0
styling: Bootstrap 5.3.2 + CSS Modules
state: useState, useRef (no Redux)
routing: anchor-scroll (#id)
contact: WhatsApp API (not EmailJS)
```

---

## COMPONENT_TREE
```
App.js [ROOT]
├── Vnavbar.js [state: openMenu]
│   └── MobileNav.js [props: isOpen, toggle]
├── Hero.js [stateless]
├── Skill.js [state: selectedSkill]
│   ├── SkillCard.js [props: data, onClick] ×4
│   └── SkillInfo.js [props: selectedSkill]
├── Projects.js [stateless]
│   └── ProjectCard.js [props: project] ×n
├── WorkExp.js [ref: sliderRef]
│   └── ExpCard.js [props: exp] ×n
├── ContactMe.js [stateless]
│   ├── ContactCard.js [props: icon, label, href] ×3
│   └── ContactForm.js [state: formData{name,message}]
└── Footer.js [computed: currentYear]
```

---

## DATA_FLOW
```
src/utils/data.js
│
├─► SKILLS[4] ──► Skill.js
│   │               ├── map() → SkillCard(onClick)
│   │               └── selectedSkill → SkillInfo
│   │
│   schema: {
│     title: string,
│     icon: string (path),
│     skill: [{skill: string, percentage: string}]
│   }
│
├─► PROJECTS[n] ──► Projects.js
│   │                └── map() → ProjectCard(hover→links)
│   │
│   schema: {
│     title: string,
│     description: string,
│     image: string (path),
│     technologies: string[],
│     github: string|null,
│     demo: string|null
│   }
│
└─► WORK_EXPS[n] ──► WorkExp.js
                      └── Slider → map() → ExpCard
    
    schema: {
      title: string,
      date: string,
      respons: string[]
    }
```

---

## STATE_MAP
```javascript
// Vnavbar.js
useState(openMenu: boolean) → toggleMobileNav()

// Skill.js  
useState(selectedSkill: object|null) → setSelectedSkill(SKILLS[i])

// WorkExp.js
useRef(sliderRef) → sliderRef.current.slickPrev/Next()

// ContactForm.js
useState(formData: {name: "", message: ""})
→ onChange: setFormData({...formData, [field]: value})
→ onSubmit: window.open(whatsappURL)
```

---

## STYLE_MAP
```
Component          CSS File              Key Classes
─────────────────────────────────────────────────────
App.js          → App.css              .nav-*, :root vars
Vnavbar.js      → App.css              .nav-header, .nav-links
MobileNav.js    → MobileNav.css        .mobile-nav, .mobile-overlay
Hero.js         → Hero.css             .hero-box, .hero-content
Skill.js        → Skill.css            .skills-section
SkillCard.js    → SkillCard.css        .skill-card
SkillInfo.js    → SkillInfo.css        .skill-info, .progress-bar
Projects.js     → Projects.css         .projects-section
ProjectCard.js  → ProjectCard.css      .project-card, .overlay
WorkExp.js      → WorkExp.css          .work-exp-section
ExpCard.js      → ExpCard.css          .exp-card
ContactMe.js    → ContactMe.css        .contact-section
ContactCard.js  → ContactCard.css      .contact-card
ContactForm.js  → ContactForm.css      .contact-form
Footer.js       → Footer.css           .footer
```

---

## CSS_VARS (App.css :root)
```css
--main-color: #a993fe   /* primary purple */
--sec-color:  #7e61e7   /* secondary purple */
--purple-1:   #240046
--purple-2:   #3C096C
--purple-3:   #5A189A
--purple-4:   #7B2CBF
--purple-5:   #9D4EDD
```

---

## ASSETS_PATH
```
public/assets/
├── icon/
│   ├── Melo_icon.ico      [favicon]
│   ├── frontEnd.png       [skill-card]
│   ├── backEnd.png        [skill-card]
│   ├── tools.png          [skill-card]
│   ├── soft_skill.png     [skill-card]
│   ├── react.png
│   ├── github.png
│   ├── php.png
│   ├── lara.webp
│   ├── laravel.jpg
│   ├── gmail_icon.png
│   └── WA_icon.png
│
└── image/
    └── profile.jpg        [hero]
```

---

## NAVIGATION_ANCHORS
```
#skills    → Skill.js section
#projects  → Projects.js section
#work-exp  → WorkExp.js section
#contact   → ContactMe.js section
```

---

## EDIT_QUICK_REF
```yaml
personal_data:
  name: [Vnavbar.js, MobileNav.js, Hero.js]
  bio: Hero.js
  email: ContactMe.js
  whatsapp: ContactForm.js (phoneNumber var)
  github: ContactMe.js
  cv_link: [Vnavbar.js, MobileNav.js] → "Hire Me" btn
  
content_data:
  skills: utils/data.js → SKILLS[]
  projects: utils/data.js → PROJECTS[]
  experience: utils/data.js → WORK_EXPS[]

meta_seo:
  title: public/index.html → <title>
  favicon: public/index.html → link[rel=icon]
  og_tags: public/index.html → meta[property^=og]
```

---

## CONVENTIONS
```
naming:
  components: PascalCase (SkillCard.js)
  css_files: same as component (SkillCard.css)
  css_classes: kebab-case (.skill-card)
  css_vars: --prefix-name

patterns:
  import: '../App.css' + '../style/Component.css'
  hooks: import { useState, useRef, Fragment } from "react"  # only when needed
  export: export default function Component() {}
  wrapper: <> <section> </section> </>
  
grid: Bootstrap (row, col-12, col-md-*)
carousel: react-slick (Slider component)
icons: react-icons (Bs* exports)
```

---

## DEPS
```json
{
  "react": "^18.2.0",
  "bootstrap": "^5.3.2",
  "react-icons": "^5.0.1",
  "react-slick": "^0.30.2",
  "slick-carousel": "^1.8.1"
}
// Note: @emailjs/browser installed but NOT implemented - can be removed
```

---

## KNOWN_ISSUES
```
[x] import { React } unnecessary → FIXED (11/01/2026)
[x] slideToShow typo in WorkExp.js → FIXED (11/01/2026)
[x] Webapack typo in data.js → FIXED (11/01/2026)
[ ] @emailjs/browser dep unused → remove or implement
```
