<div align="center">

# 🚀 End-to-End Python CI/CD GitOps Pipeline

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-orange)
![Docker](https://img.shields.io/badge/Docker-Container-blue)
![Amazon ECR](https://img.shields.io/badge/Amazon-ECR-yellow)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Cluster-326CE5)
![ArgoCD](https://img.shields.io/badge/ArgoCD-GitOps-red)
![GitOps](https://img.shields.io/badge/GitOps-Automated-brightgreen)

![Architecture](Architecture/arch.png)

</div>

---

# 📂 Project Structure

| File / Folder | Description |
|---------------|-------------|
| 📄 app.py | Flask Web Application |
| 📄 calculator.py | Scientific Calculator Logic |
| 📄 test_calculator.py | Pytest Test Cases |
| 📄 requirements.txt | Python Dependencies |
| 📄 Dockerfile | Docker Image Configuration |
| 📁 templates | HTML Templates |
| 📁 static | CSS & JavaScript Files |
| 📁 manifests | Kubernetes & ArgoCD Manifests |
| 📁 .github/workflows | GitHub Actions Pipeline |
| 📁 Architecture | Architecture Diagram |

---

# 🧠 Project Overview

This project demonstrates a complete **End-to-End DevOps CI/CD + GitOps Pipeline** for deploying a Python Flask Scientific Calculator.

Whenever code is pushed to GitHub, the pipeline automatically:

- Executes automated testing
- Builds a Docker image
- Pushes the image to Amazon ECR
- Stores build artifacts
- Triggers GitOps deployment through ArgoCD
- Synchronizes Kubernetes manifests
- Deploys the application to Kubernetes

---

# 🏗️ Architecture at a Glance

```text
Developer
      │
      ▼
GitHub Repository
      │
      ▼
GitHub Actions
      │
      ├── Setup Python
      ├── Install Dependencies
      ├── Execute Pytest
      ├── Build Docker Image
      ├── Push Image to Amazon ECR
      ├── Upload Build Artifacts
      └── Update Kubernetes Manifests
                    │
                    ▼
              Amazon ECR
                    │
                    ▼
                ArgoCD (GitOps)
                    │
                    ▼
             Kubernetes Cluster
                    │
                    ▼
          Python Flask Calculator
```

---

# 🔧 Tech Stack

| Layer | Technology |
|--------|------------|
| Programming | Python 3.12 |
| Framework | Flask |
| Testing | Pytest |
| Source Control | GitHub |
| CI/CD | GitHub Actions |
| Containerization | Docker |
| Container Registry | Amazon ECR |
| Orchestration | Kubernetes |
| GitOps | ArgoCD |
| Artifact Storage | GitHub Artifacts |

---

# 🧮 Scientific Calculator Features

## Basic Operations

- Addition
- Subtraction
- Multiplication
- Division

## Scientific Operations

- Power
- Square Root
- Factorial
- Percentage
- Modulus

## Mathematical Operations

- Absolute Value
- Average
- Maximum
- Minimum

## Trigonometric Functions

- Sine
- Cosine
- Tangent

## Logarithmic Functions

- Logarithm

---

# 🌐 Flask Web Interface

The application includes a responsive web interface built using:

- HTML5
- CSS3
- JavaScript
- Flask Templates

Users can perform calculator operations directly through the browser.

---

# 🧪 Automated Testing

The project contains automated Pytest test cases covering:

| Module | Status |
|---------|--------|
| Addition | ✅ |
| Subtraction | ✅ |
| Multiplication | ✅ |
| Division | ✅ |
| Power | ✅ |
| Square Root | ✅ |
| Factorial | ✅ |
| Percentage | ✅ |
| Modulus | ✅ |
| Mathematical Functions | ✅ |

The CI pipeline automatically executes all tests before proceeding to the build stage.

---

# ⚙️ CI/CD Pipeline

## Pipeline Trigger

The workflow executes when:

- Code is pushed to the **main** branch
- Manual workflow is triggered
- Scheduled workflow runs

```yaml
on:
  push:
    branches:
      - main

  workflow_dispatch:

  schedule:
    - cron: '30 10 * * *'
```

---

# 🧪 Stage 1 — Testing

Activities:

- Checkout Repository
- Setup Python
- Install Dependencies
- Execute Pytest

```bash
pytest -v
```

Pipeline immediately stops if any test fails.

---

# 🐳 Stage 2 — Docker Build

Activities:

- Build Docker Image
- Tag Image
- Push Image to Amazon ECR

```bash
docker build -t python-cicd-pipeline:v2 .
docker push <ECR_REPOSITORY_URI>:v2
```

---

# ☁️ Stage 3 — Amazon ECR

The Docker image is securely stored in Amazon Elastic Container Registry.

Example:

```text
python-cicd-pipeline:v2
```

---

# ☸️ Stage 4 — Kubernetes Deployment

The project deploys using Kubernetes manifests.

Resources deployed:

- Namespace
- Deployment
- Service

Application runs inside the Kubernetes cluster.

---

# 🚀 Stage 5 — GitOps with ArgoCD

ArgoCD continuously monitors the GitHub repository.

Whenever manifests change:

- Detects Git commit
- Synchronizes automatically
- Deploys latest version
- Maintains desired cluster state

Auto Sync:

```text
Enabled
```

---

# 📦 Build Artifacts

Pipeline generates:

| Artifact | Purpose |
|----------|---------|
| Docker Image | Container Deployment |
| Build Artifact | Application Package |
| Deployment Report | Deployment Summary |

---

# 🌍 Application Flow

```text
Developer
      │
      ▼
Git Push
      │
      ▼
GitHub Actions
      │
      ▼
Automated Testing
      │
      ▼
Docker Build
      │
      ▼
Amazon ECR
      │
      ▼
ArgoCD
      │
      ▼
Kubernetes
      │
      ▼
Flask Calculator UI
```

---

# 🚀 Running Locally

Clone Repository

```bash
git clone https://github.com/NIHAL2175/python-cicd-pipeline.git

cd python-cicd-pipeline
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Run Application

```bash
python app.py
```

Open Browser

```text
http://localhost:8000
```

Execute Tests

```bash
pytest -v
```

---

# 📈 Pipeline Features

✅ Continuous Integration

✅ Continuous Deployment

✅ GitOps Workflow

✅ Docker Containerization

✅ Amazon ECR Integration

✅ Kubernetes Deployment

✅ ArgoCD Auto Sync

✅ Automated Testing

✅ Build Artifact Generation

✅ Infrastructure as Code

---

# 🎯 Key Learning Outcomes

- GitHub Actions CI/CD
- Docker Image Management
- Amazon ECR
- Kubernetes Deployments
- GitOps using ArgoCD
- Flask Application Deployment
- Automated Testing with Pytest
- End-to-End DevOps Workflow
- Continuous Delivery Best Practices

---

<div align="center">

# 👨‍💻 Author

### NIHAL N

**DevOps • Cloud • Kubernetes • GitOps**

⭐ If you found this project useful, consider giving it a star.

</div>

---