---
title: Teaching a 1.5B model to read loan letters
date: 2026-10-21
summary: How I fine-tuned Qwen2.5-1.5B with LoRA to turn sanction letter PDFs into structured JSON.
---

At Oxyzo, loan sanction letters arrive as PDFs. Every lender uses its own layout, and checking each letter by hand against internal records is slow work. I wanted a model that reads a letter and returns the key fields as clean JSON.

## Building the dataset

I took the text from each PDF, paired it with the expected answer, and wrote each pair as a chat example in JSONL. The training data covered letters from 5 different lenders, so the model saw several layouts.

## Training

- **Base model:** Qwen2.5-1.5B-Instruct
- **Method:** LoRA adapters with 4-bit quantization, so it trains on modest hardware
- **Long-context training**, because sanction letters are long
- **Tools:** Unsloth and TRL's `SFTTrainer`

## How it's used

The JSON output is used for data checks and to find mismatches between the letters and the records.
