# 🌿 Smart Sanitization — Civic Waste Management Platform

**Smart Sanitization** is a modern civic-tech web application built with React and Vite. It empowers citizens to report public garbage dump sites, upload photographic evidence, pinpoint coordinates on an interactive city map, and track real-time resolution status. Simultaneously, municipal sanitation officers utilize a dedicated state-management dashboard to review complaints, dispatch collection vehicles, assign sanitation personnel, and verify cleanups.

---

## 📑 Table of Contents
1. [Key Features & Implemented Architecture](#key-features--implemented-architecture)
2. [Technology Stack](#technology-stack)
3. [Project Directory Structure](#project-directory-structure)
4. [Installation & Running Locally](#installation--running-locally)
5. [Application Routing Architecture](#application-routing-architecture)
6. [State Management Architecture](#state-management-architecture)
   - [Context API: Shared Domain State](#1-context-api-shared-domain-state)
   - [Global State vs. Local Component State](#2-global-state-vs-local-component-state)
   - [Zustand Store: UI Preferences & Civic Alerts](#3-zustand-store-ui-preferences--civic-alerts)
7. [Asynchronous Mock Service Layer](#asynchronous-mock-service-layer)
8. [Loading, Error, Success & Empty States](#loading-error-success--empty-states)
9. [Form Handling, Validation & Reusable Components](#form-handling-validation--reusable-components)
10. [Interactive City Map (Leaflet & OpenStreetMap)](#interactive-city-map-leaflet--openstreetmap)
11. [Data Persistence Architecture](#data-persistence-architecture)
12. [Academic Deliverable Note: Routing & Portfolio mini-project](#academic-deliverable-note-routing--portfolio-mini-project)
13. [Future Technical Roadmap](#future-technical-roadmap)

---

## 🚀 Key Features & Implemented Architecture

- **Multi-Page SPA Navigation**: Client-side routing with `react-router-dom` v7, nested layouts via `<Outlet />`, persistent navigation headers/footers, dynamic active links, and a dedicated 404 Not Found fallback page.
- **Central State Architecture (Context API)**: Single Source of Truth (`ComplaintContext`) ensuring that complaint creations, assignments, and status transitions instantly synchronize across Citizen and Municipal portals without page refreshes.
- **Zustand State Store**: Clean demonstration of modern Zustand state management decoupled from domain entities, powering application-wide civic announcements and dashboard table density controls.
- **Asynchronous Service Layer**: Realistic REST API simulation with Promises, latency delays, and a controlled error testing mode for demonstrating network resilience.
- **Robust Form Validation & Reusable Inputs**: Structured validation covering mandatory fields, description lengths, image MIME types, file sizes (< 2.5MB), GPS coordinates, and real-time error clearing.
- **Interactive OpenStreetMap with Leaflet**: Click-to-pin coordinate picker with custom map markers and visual indicators for nearby complaint clusters.
- **Safe Persistence**: LocalStorage caching with JSON parse guardrails, fallback seeds, and zero risk of overwriting or erasing existing valid records.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Core Framework** | React 19 (`react`, `react-dom`) | Declarative, component-based user interface |
| **Build Tool & Dev Server** | Vite 8 (`vite`, `@vitejs/plugin-react`) | High-speed ESM bundler and HMR environment |
| **Routing** | React Router DOM 7 | Client-side routing, nested routes, and 404 fallback |
| **Domain State** | React Context API (`createContext`, `useContext`) | Centralized complaint workflow and CRUD operations |
| **UI State Management** | Zustand (`zustand`) | Lightweight store for table density and civic broadcast alerts |
| **Map API** | Leaflet & OpenStreetMap (`leaflet`) | Interactive map rendering, custom markers, coordinate pinning |
| **Styling & Design System** | Vanilla CSS with custom properties (`src/index.css`) | Responsive layouts, accessible color contrast, micro-animations |
| **Code Quality & Linting** | Oxlint (`oxlint`) | Ultra-fast JS/JSX static analysis and linting |

---

## 📁 Project Directory Structure

```text
react_project/
├── index.html                     # HTML5 entry with meta descriptions & Inter font
├── package.json                   # Dependencies, scripts (dev, build, lint, preview)
├── vite.config.js                 # Vite configuration with React plugin
├── src/
│   ├── main.jsx                   # React 19 root mounting with BrowserRouter
│   ├── App.jsx                    # Application root, ComplaintProvider & Route definitions
│   ├── index.css                  # Design system tokens, responsive utilities, map styles
│   ├── components/
│   │   ├── MainLayout.jsx         # Layout shell wrapping Navbar, Outlet, Footer, Alert
│   │   ├── Navbar.jsx             # Sticky navigation bar with active links & mobile toggle
│   │   ├── Footer.jsx             # Comprehensive footer with quick links & branding
│   │   ├── CivicAlertBanner.jsx   # Zustand-connected municipal broadcast announcement
│   │   ├── Button.jsx             # Reusable button with variants (primary, secondary, danger)
│   │   ├── ComplaintForm.jsx      # Reporting form with async submission & validation
│   │   ├── ImageUploader.jsx      # FileReader photo uploader with size & format validation
│   │   ├── LocationInput.jsx      # Area, city, landmark inputs with geolocation support
│   │   ├── ReportMap.jsx          # Leaflet OpenStreetMap interactive pin drop component
│   │   ├── DomDemoCard.jsx        # Educational comparison: Vanilla DOM vs React State
│   │   └── common/                # Reusable form primitive components
│   │       ├── FormInput.jsx      # Standardized controlled text input with accessible errors
│   │       ├── FormSelect.jsx     # Dropdown select input with custom options
│   │       ├── FormTextarea.jsx   # Textarea input with live character counter
│   │       └── FormError.jsx      # Accessible error message badge
│   ├── context/
│   │   └── ComplaintContext.jsx   # Central complaint state, actions, and custom hook
│   ├── store/
│   │   └── useAppStore.js         # Zustand store for UI preferences & broadcast alerts
│   ├── services/
│   │   └── complaintService.js    # Mock asynchronous API layer with Promises & localStorage
│   ├── pages/
│   │   ├── Home.jsx               # Landing page with live status counter & solution cards
│   │   ├── ReportGarbage.jsx      # Citizen garbage reporting page
│   │   ├── TrackComplaint.jsx     # Real-time complaint lookup & 4-step progress stepper
│   │   ├── CitizenDashboard.jsx   # Community metrics, search, and complaint table
│   │   ├── MunicipalDashboard.jsx # Municipal state mini-project (filters, assignment modal)
│   │   └── NotFound.jsx           # Friendly 404 Route Not Found fallback page
│   ├── data/
│   │   └── mockData.js            # Initial seed complaints & registered municipal workers
│   └── utils/
│       └── helpers.js             # Date formatters, ID generators, and badge status styles
```

---

## 💻 Installation & Running Locally

### 1. Prerequisites
- Node.js (version 18.0.0 or higher recommended)
- npm (version 9.0.0 or higher)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/` (or the port displayed in your terminal).

### 4. Build for Production
```bash
npm run build
```
Generates optimized HTML, CSS, and JS production bundles inside `dist/`.

### 5. Run Linter
```bash
npm run lint
```
Lints all JavaScript and JSX source files using Oxlint.

---

## 🗺️ Application Routing Architecture

Client-side routing is handled through `react-router-dom` v7 with a nested layout architecture:

```jsx
<ComplaintProvider>
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<ReportGarbage />} />
      <Route path="/track" element={<TrackComplaint />} />
      <Route path="/citizen" element={<CitizenDashboard />} />
      <Route path="/municipal" element={<MunicipalDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</ComplaintProvider>
```

- **Client-Side Transitions**: Uses React Router `<Link>` and `<NavLink>` components to navigate between views without full-page browser refreshes.
- **Active Navigation Highlighting**: `<NavLink>` provides dynamic `className={({ isActive }) => isActive ? 'active' : ''}` for instant visual indication of the current route.
- **Nested Layout Shell (`MainLayout`)**: Houses `<Navbar />`, `<CivicAlertBanner />`, `<Outlet />`, and `<Footer />` in a persistent structure, avoiding redundant layout duplication across pages.
- **Fallback Catch-All Route (`*`)**: Renders `<NotFound />` whenever a user inputs an unrecognized URL, presenting helpful links to navigate back safely.

---

## ⚡ State Management Architecture

### 1. Context API: Shared Domain State
The primary state of the platform — **Complaint Records** — is managed through `ComplaintContext` located in `src/context/ComplaintContext.jsx`.

```jsx
const { complaints, isLoading, error, addComplaint, updateComplaint, getComplaintById } = useComplaints();
```

- **Single Source of Truth**: Eliminates prop-drilling across deeply nested components.
- **Cross-Component Synchronization**: If a municipal officer assigns an employee or advances a complaint's status to `In Progress` in the Municipal Dashboard, that change immediately reflects on the Citizen Dashboard, the Tracking Page, and the Home Page live counter without any page reload.

### 2. Global State vs. Local Component State

| Category | Managed By | Examples in Smart Sanitization | Rationale |
|---|---|---|---|
| **Global State** | `ComplaintContext` | Complaint list, async loading flags, global error messages | Needed simultaneously by Citizen views, Municipal views, and Search/Track pages |
| **UI State** | `useAppStore` (Zustand) | Table density (`compact`/`comfortable`), broadcast alerts | Cross-cutting UI preferences that do not belong in the domain complaint model |
| **Local State** | React `useState` | Form inputs before submission, search text, modal open/close, active filter tabs | Ephemeral; discarded once the modal closes or the user leaves the page |

### 3. Zustand Store: UI Preferences & Civic Alerts
To address modern state management libraries cleanly without creating competing sources of truth for complaints, **Zustand** is introduced in `src/store/useAppStore.js` for separate UI concerns:
- **Table Density**: Allows municipal officers to toggle between `Comfortable` and `Compact` table row padding.
- **Civic Broadcast Alerts**: Global announcement strip at the top of the viewport (e.g. monsoon alerts or emergency sanitation drives) with one-click dismissal.

---

## 🔄 Asynchronous Mock Service Layer

Located in `src/services/complaintService.js`, this layer separates business logic and persistence from UI components:

```javascript
// Returns Promise<Complaint[]> simulating network latency
export function fetchComplaints() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateNetworkError) {
        reject(new Error('Simulated Network Error: Failed to fetch complaints.'));
        return;
      }
      resolve(readStorage() || mockComplaints);
    }, 450);
  });
}
```

- **Simulated Latency**: Uses ES6 Promises and a realistic 450ms delay to reflect network round-trips.
- **Future Backend Ready**: When a Node.js/Express or Python backend is added in future phases, the functions in `complaintService.js` can simply be swapped with `fetch()` or `axios.get()` calls without altering any page or component logic!
- **Examiner Test Mode**: Includes a **Test Error Mode** toggle in the Municipal Dashboard (`toggleSimulateError()`) so examiners can witness error banners and retry mechanisms in real time.

---

## ⏳ Loading, Error, Success & Empty States

Every user workflow includes comprehensive UI state transitions:
1. **Loading State**: Table skeletons and disabled button indicators (`⏳ Submitting Report...`) prevent double-submission.
2. **Error State**: Non-disruptive inline error alerts and network failure banners featuring a **Retry** button.
3. **Success State**: Dedicated confirmation card displaying the generated Complaint ID (e.g., `SS-20261023-7J59`) with a **Copy ID** button and direct navigation to Track Complaint.
4. **Empty State**: Friendly graphic and clear guidance when a search or filter produces zero results, accompanied by a **Reset Filters** button.

---

## 📋 Form Handling, Validation & Reusable Components

The garbage reporting interface (`src/components/ComplaintForm.jsx`) is built with controlled components and modular UI inputs:

### Reusable Input Components
- `FormInput`: Accessible text/number input supporting labels, placeholders, disabled states, and ARIA error associations.
- `FormSelect`: Standardized dropdown component for selecting categories.
- `FormTextarea`: Multi-line text field featuring a live character counter (`0/500`).
- `FormError`: Accessible error text element (`role="alert"`).
- `ImageUploader`: HTML5 FileReader component with format validation (`image/jpeg`, `image/png`, `image/webp`) and strict file size enforcement (< 2.5MB).
- `LocationInput`: Grouped controlled fields with HTML5 GPS auto-detection and demo fallback.

### Validation Strategies
- **Client-Side Guardrails**: Form cannot be submitted with empty required fields, descriptions under 10 characters, or invalid image formats.
- **Instant Error Clearing**: When a user modifies an invalid input, the corresponding error clears immediately, improving perceived responsiveness.

---

## 🗺️ Interactive City Map (Leaflet & OpenStreetMap)

Implemented in `src/components/ReportMap.jsx`:
- **Open-Source & Free**: Built with Leaflet and OpenStreetMap tiles; requires no paid API keys or tracking tokens.
- **Click-to-Pin**: Clicking anywhere on the city map drops a custom pin (`📍`) and records exact latitude and longitude in frontend state.
- **Hotspot Visualization**: Existing active complaints are visualized as colored circle markers (`🟡 Pending`, `🔵 Assigned`, `🟣 In Progress`, `🟢 Resolved`) with interactive popups displaying complaint summaries.
- **Manual Fallback**: If a citizen does not interact with the map, the manual locality and landmark text fields remain fully functional.

---

## 💾 Data Persistence Architecture

- **Safe localStorage Usage**: Uses the key `smartsanitization_complaints`.
- **Defensive Parsing**: Wrapped inside `try/catch` blocks to guard against corrupted or malformed browser storage.
- **Non-Destructive Initialization**: If localStorage already contains valid complaints, the application preserves them and never overwrites them with blank defaults upon page refresh.
- **Production Note**: Storing Base64 images directly inside localStorage is suitable for local demonstrations and mock environments, but production implementations would upload photos to S3/Cloud Storage and persist only URL strings in a relational database.

---

## 🎓 Academic Deliverable Note: Routing & Portfolio Mini-Project

The academic syllabus explicitly notes:
> *"Multi-page SPA design and mini-project on a portfolio site with routing."*

### How Smart Sanitization Covers the Routing Concepts:
Smart Sanitization comprehensively demonstrates the exact routing competencies outlined in the curriculum:
1. Multi-page SPA navigation using `react-router-dom`.
2. Clean route hierarchy with nested layouts (`MainLayout`, `<Outlet />`).
3. Parameterized query lookups (`/track?id=...`).
4. Dynamic active navigation indicators (`<NavLink>`).
5. Client-side redirection using `useNavigate`.
6. Custom 404 Not Found catch-all route (`*`).

### Deliverable Distinction:
While Smart Sanitization fully demonstrates these technical routing concepts within a civic-tech domain, **it is a municipal public service platform, not a personal developer portfolio**. If a course evaluator or academic examiner strictly requires a personal portfolio website as a standalone project, that may need to be presented as a separate academic deliverable alongside this application.

---

## 🔮 Future Technical Roadmap

The frontend architecture is intentionally structured to integrate seamlessly with future system expansions:
- **Backend API Integration**: Connect `complaintService.js` to real REST/GraphQL endpoints powered by Node.js/Express, Python/FastAPI, or Go.
- **Database Persistence**: Replace client-side localStorage with PostgreSQL or MongoDB.
- **Authentication & RBAC**: Real JSON Web Token (JWT) or OAuth2 authentication separating Citizen, Municipal Officer, and Field Worker permissions.
- **AI/ML Garbage Classification**: Computer Vision model (e.g., TensorFlow.js or a cloud vision API) to verify waste category and volume from uploaded photographs.
- **GPS Route Optimization**: Dynamic routing algorithms for municipal collection trucks based on complaint clusters and worker locations.
