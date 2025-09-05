# 🔥 Fire Weather Index (FWI) Predictor

A Machine Learning project that predicts the **Fire Weather Index (FWI)** — a numerical indicator of forest fire risk — using the **Algerian Forest Fire dataset**.

This project demonstrates the **end-to-end ML pipeline**:

* 📊 Data preprocessing & model building
* ⚙️ API creation with Flask
* ☁️ Deployment on Render with a live frontend

🌐 **Live Demo** → [FWI Predictor Web App](https://fwi-predictor-mhpg.onrender.com/)

---

## 📌 Project Overview

Forest fires pose serious ecological and economic threats. The **FWI** provides an estimate of fire danger based on weather conditions.
This project builds a regression model to predict FWI values and makes it accessible via a web app.

✨ **Key Features:**

* 🤖 Regression model (Linear Regression as baseline)
* 🛠️ Flask API serving live predictions
* 🌍 Deployed on Render with a simple frontend
* 🔄 Full-stack implementation: ML → API → Deployment

---

## 🛠️ Tech Stack

* 🐍 Python (Pandas, NumPy, Scikit-learn)
* 🚀 Flask (for API development)
* 🎨 HTML/CSS/JS (for frontend UI)
* ☁️ Render (for deployment)

---

## 📂 Repository Structure

```
├── data/                 # Dataset (Algerian Forest Fire dataset)
├── notebooks/            # Jupyter notebooks for EDA & model training
├── model/                # Trained model files
├── app/                  
│   ├── app.py            # Flask API entry point
│   ├── requirements.txt  # Dependencies
│   └── templates/        # Frontend (HTML/CSS)
├── README.md             # Project documentation
└── deployment/           # Render configuration files
```

---

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/fwi-predictor.git
cd fwi-predictor
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run Locally

```bash
python app/app.py
```

Open 👉 [http://localhost:5000](http://localhost:5000) in your browser.

---

## 🎯 Future Work

* 🔎 Improve accuracy with advanced models (Random Forest, Gradient Boosting, Neural Networks).
* 🌦️ Integrate real-time weather APIs for live forecasting.
* ⚡ Explore MLOps practices for automated training and CI/CD pipelines.

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 👤 Author

**Yash**
💼 LinkedIn: [Your Profile](https://www.linkedin.com/in/yash-kumar101/)
