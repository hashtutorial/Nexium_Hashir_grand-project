# 🧾 Product Requirements Document: ChefGPT

**Project Name**: ChefGPT – Your Personalized Recipe Buddy  
**Duration**: 15 days
**Team**: M.Hashir Adnan (Solo)

---

## Problem Statement

People often struggle to decide what to cook based on what they have in their kitchen. Most recipe apps offer static suggestions or pre-written recipes and lack personalization, local context, or multilingual support.

---

## 💡 Solution

ChefGPT uses AI to dynamically generate customized recipes based on:

- User-provided ingredients
- Personal preferences (e.g., desi, fusion, vegetarian, low-budget)
- Cooking style (quick, stove-free)
- Language preference (English or Urdu)
- Optional nutrition info and shopping list(for ingredients missing from user input) generation

It aims to be a smart, culturally aware, and flexible cooking assistant.

---

## Key Features

| Feature            | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| Ingredient Input   | User provides a list of ingredients they have.                              |
| AI Recipe Creation | LLM generates a unique recipe using n8n + Together AI                       |
| Urdu Translation   | Recipes are translated into Urdu using prompt-based translation             |
| Fusion Mode        | Toggle to convert recipes into fusion/desi versions                         |
| Smart Shopping List| Suggests additional required ingredients with quantities                    |
| Nutrition Insights | LLM provides approximate calorie and macro breakdown                        |
| Save Recipes       | Save user recipes in MongoDB with tags and timestamps                       |

---

## Tech Stack

| Layer     | Technology                           |
|-----------|--------------------------------------|
| Frontend  | Next.js, Tailwind CSS, ShadCN UI     |
| Backend   | Node.js (Express if needed)          |
| Database  | MongoDB (recipes), Supabase (optional for auth) |
| AI        | Together AI via n8n LLM workflows    |
| CI/CD     | GitHub Actions + Vercel Deployment   |
| Workflow  | n8n for prompt chains & AI logic     |

---

## User Flow

1. User opens the app and inputs ingredients + selects preferences
2. n8n triggers prompt to generate a full recipe using LLM
3. The result is displayed with:
   - Cooking steps
   - Optional Urdu version
   - Toggle for fusion mode(combination of different cuisine styles)
   - Optional nutrition info(caloric count) or shopping list
4. User can save, regenerate, or explore similar recipes

---

## Database Models (Draft)

### Recipe
- `id`
- `title`
- `ingredients` (array)
- `steps`
- `tags` (e.g., desi, fusion)
- `language` (EN/UR)
- `nutritionInfo` (optional)
- `createdAt`

---

## Milestones & Timeline

| Day  | Milestone                            |
|------|--------------------------------------|
| 15   | PRD + Wireframes pushed              |
| 16–17| Backend boilerplate + DB schema      |
| 18   | Backend + DB pushed to GitHub        |
| 19–20| Frontend screens setup               |
| 21   | Frontend milestone pushed            |
| 22–23| AI logic integration via n8n         |
| 24   | AI flows milestone pushed            |
| 25   | UI polish, responsive tweaks         |
| 26   | Bug fixing, final tweaks             |
| 27   | Live deployment (Vercel)             |
| 28   | Final QA pass                        |
| 29   | Loom demo + README                   |
| 30   | Final project submission             |

---

## AI Workflow Notes (LLM + n8n)

- LLM prompt adapts to:
  - User's ingredients
  - Selected cooking style (quick, budget, veg)
  - Output language (English/Urdu)
  - Fusion toggle (e.g., turn Western dish Desi)

- Prompt examples:
  - "Generate a healthy, budget-friendly dinner using eggs, potatoes, and spices. Output in Urdu."
  - "Desify this Western recipe using Pakistani ingredients."

- Shopping list is **AI-generated from missing ingredients** based on recipe logic.
- Nutrition is estimated using language models (approximations, not database-backed).
