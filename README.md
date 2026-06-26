# Tender Tracker

A full-stack web application to track GEM (Government e-Marketplace) tenders, including financial evaluation, seller rankings, zone/state management, remarks, and strategy feedback.

## Tech Stack

- **Frontend**: React (Vite + Create React App), vanilla CSS
- **Backend**: Node.js + Express
- **Database**: MySQL (`user_allocation` database)

## Features

- View all tenders fetched from `gem_tenders`, `tender_processing_results`, and `tender_tracker` tables
- Financial evaluation showing Seller Name 1/2/3 and their prices
- SAP Material Code shown only when tender relevancy is marked as **"yes"**
- Inline editable fields: Tender Type, DB Name, ZM, HO Person, Zone, Final Remarks, Feedback Strategy
- Auto-save on blur / dropdown change
- Filter by FY Year, State, Zone, Tender Type
- Full-text search across all fields
- Pagination (100 records per page)
- PDF export of the full filtered table

## Project Structure

```
Tracker/
├── backend/          # Express API server
│   ├── routes/       # tenderRoutes.js, userRoutes.js
│   ├── config/       # db.js (MySQL connection)
│   └── app.js
├── frontend/         # React app
│   └── src/
│       ├── App.jsx
│       └── App.css
└── sql_files/        # SQL dump files
```

## Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Database
- Import the SQL files from `sql_files/` into MySQL
- Update `backend/config/db.js` with your credentials

## Environment

Create `backend/.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=user_allocation
PORT=5000
```
