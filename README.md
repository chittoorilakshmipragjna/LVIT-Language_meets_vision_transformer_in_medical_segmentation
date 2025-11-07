---

# 🏥 LViT - Language meets Vision Transformer for Medical Image Segmentation

**LViT** is an advanced **AI-powered medical image segmentation system** that combines **Vision Transformers (ViT)** with **text annotations** to improve segmentation accuracy, especially in semi-supervised learning scenarios. This project leverages **multimodal learning** (image + text) to compensate for limited labeled medical data.

***

## 🚀 Project Overview

Medical image segmentation is critical for diagnosis and treatment planning, but obtaining high-quality labeled data is expensive and time-consuming. **LViT** addresses this challenge by:

- **Integrating text annotations** (doctor's reports) with medical images (X-rays, CT scans)
- **Using a hybrid CNN-ViT architecture** for local and global feature extraction
- **Supporting semi-supervised learning** with pseudo-label refinement (EPI mechanism)
- **Achieving state-of-the-art performance** on COVID-19 lung segmentation datasets

The goal is to make **medical image segmentation faster, more accurate, and more accessible**, even with limited labeled data.

***

## 🧩 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERFACE                           │
│              (React / Streamlit Web App)                    │
│                                                             │
│   📤 Upload X-ray/CT Image  |  📝 Enter Medical Report     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTP Request (Image + Text)
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND API SERVER                        │
│                  (Flask / FastAPI)                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Preprocessing Pipeline                             |    |
│  │  • Resize image to 224×224                           │   │
│  │  • Normalize pixel values                            │   │
│  │  • Tokenize text with BERT                           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Preprocessed Data
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    LViT MODEL                               │
│            (Hybrid CNN + Vision Transformer)                │
│                                                             │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │   CNN Branch     │         │   ViT Branch     │         │
│  │  (Local Details) │◄───────►│ (Global Context) │         │
│  │                  │         │  + Text Fusion   │         │
│  └────────┬─────────┘         └────────┬─────────┘         │
│           │                            │                   │
│           └─────────┬──────────────────┘                   │
│                     │                                      │
│           ┌─────────▼─────────┐                            │
│           │  PLAM Module      │  ← Merges features         │
│           │ (Attention Fusion)│                            │
│           └─────────┬─────────┘                            │
│                     │                                      │
│                     ▼                                      │
│           ┌──────────────────┐                             │
│           │ Segmentation Mask│                             │
│           │    (Output)      │                             │
│           └──────────────────┘                             │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Prediction Result
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              VISUALIZATION & REPORTING                      |
│                                                             │
│  📊 Mask Overlay on Image                                   │
│  • Original image with predicted mask                       │
│  • Color-coded infected regions                             │
│  • Side-by-side comparison view                             │
│                                                             │
│  📄 Clinical Report Generation                              | 
│  • Save results as PDF/PNG                                  │
│  • Doctor notes & recommendations                           │
│  • Downloadable segmentation masks                          │
└─────────────────────────────────────────────────────────────┘

```

***

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React + TypeScript / Streamlit |
| **Backend** | Flask / FastAPI (Python) |
| **Models** | PyTorch (LViT - CNN + ViT Hybrid) |
| **Text Processing** | HuggingFace Transformers (BERT) |
| **Data** | COVID-19 X-ray & CT datasets (QaTa-COV19, MosMedData, ESO-CT) |
| **Model Hosting** | Hugging Face Hub (optional) |
| **Environment** | Google Colab / Jupyter Notebook / Local Setup |
| **Version Control** | Git & GitHub |

***

## ✨ Key Features

✅ **Multimodal Learning** — Combines medical images with text annotations (doctor reports)  
✅ **Hybrid Architecture** — Double-U structure with CNN (local features) + ViT (global context)  
✅ **Semi-Supervised Learning** — Exponential Pseudo-label Iteration (EPI) for unlabeled data  
✅ **State-of-the-Art Performance** — 83.66% Dice score on QaTa-COV19, 74.57% on MosMedData  
✅ **Text-Guided Segmentation** — Uses clinical reports to improve prediction accuracy  
✅ **Real-time Inference** — Web interface for uploading images and viewing results  
✅ **Performance Metrics** — Dice score, mIoU, visual overlays, and confidence scores  

***

## 📊 Datasets

This project uses three medical image segmentation datasets with text annotations:

| Dataset | Type | Images | Description |
|---------|------|--------|-------------|
| **QaTa-COV19** | X-ray | 9,258 | COVID-19 lung infection with manual annotations |
| **MosMedData** | CT | 2,729 | Lung infection CT scans |
| **ESO-CT** | CT | 286 | Esophageal cancer segmentation |



***

## 🏗️ Model Architecture

### Double-U Structure

**LViT** uses a hybrid CNN-ViT architecture:

1. **U-Shaped CNN Branch**
   - Extracts local features (edges, boundaries)
   - Acts as segmentation head for final prediction

2. **U-Shaped ViT Branch**
   - Processes global context and cross-modal fusion
   - Integrates BERT-embedded text features with image patches

3. **Pixel-Level Attention Module (PLAM)**
   - Placed at skip connections
   - Merges CNN and ViT features for better boundary detection

4. **Exponential Pseudo-label Iteration (EPI)**
   - Refines pseudo-labels for unlabeled data
   - Uses Exponential Moving Average (EMA) for stability

5. **Language-Vision (LV) Loss**
   - Supervises unlabeled data using text-image similarity
   - Prevents mis-segmentation in semi-supervised learning

***
## 📂 Datasets Used

This project uses several datasets:

- **QaTa-COV19 Dataset** — COVID-19 chest X-ray images with infection segmentation masks.  
  [Kaggle Dataset Link (Original)](https://www.kaggle.com/datasets/aysendegerli/qatacov19-dataset)

- **MosMedData+ Dataset** — COVID-19 chest CT scans with lesion and infection segmentation.  
  - Official Website: [medicalsegmentation.com COVID-19 dataset](http://medicalsegmentation.com/covid19/)  
  - Kaggle Link: [MosMedData+ on Kaggle](https://www.kaggle.com/datasets/maedemaftouni/covid19-ct-scan-lesion-segmentation-dataset)

- **MoNuSeG Dataset** (Demo) — Multi-organ nucleus segmentation dataset from histopathology images.  
  [MoNuSeG Official Challenge Site](https://monuseg.grand-challenge.org/Data/)

- **ESO-CT Dataset** — CT scans with esophageal cancer segmentation.  
  Dataset references: [1] [2] (Add URLs or citation here)

***

## 📈 Performance Results

### Fully-Supervised Learning

| Model | Dice (QaTa-COV19) | mIoU | Dice (MosMedData) | mIoU |
|-------|-------------------|------|-------------------|------|
| U-Net | 79.02 | 69.46 | 64.60 | 50.73 |
| nnU-Net | 80.42 | 70.81 | 72.59 | 60.36 |
| TransUNet | 78.63 | 69.13 | 71.24 | 58.44 |
| **LViT-T** | **83.66** | **75.11** | **74.57** | **61.33** |

### Semi-Supervised Learning (25% labels)

| Model | Dice (QaTa-COV19) | mIoU |
|-------|-------------------|------|
| DTC | 76.07 | 66.04 |
| MC-Net | 76.93 | 67.02 |
| **LViT-T (1/4)** | **80.95** | **71.31** |

***
