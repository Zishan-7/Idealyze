# 🚀 Idealyze

A beautiful, AI-powered web application that validates startup ideas using OpenAI's GPT-4o-mini. Get comprehensive analysis including market potential, competition analysis, SWOT evaluation, and actionable recommendations.

![Idealyze](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4+-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Latest-0055FF?style=for-the-badge&logo=framer)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=for-the-badge&logo=openai)

## ✨ Features

- 🤖 **AI-Powered Analysis** - Comprehensive startup idea validation using GPT-4
- 📊 **Detailed Scoring** - Technical, Financial, Market, and Team viability scores
- 🎯 **Market Intelligence** - TAM/SAM estimation, growth rates, and competition analysis
- 🔍 **SWOT Analysis** - Strengths, Weaknesses, Opportunities, and Threats
- 💡 **Actionable Insights** - Specific recommendations and next steps
- 🎨 **Beautiful UI** - Modern design with smooth animations
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **Real-time** - Instant validation with loading states

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Styling**: TailwindCSS v4
- **UI Components**: ShadCN UI
- **Animations**: Framer Motion
- **AI**: OpenAI GPT-4o-mini
- **Language**: TypeScript
- **Notifications**: Sonner

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd idea-spark
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Enter Your Startup Idea** - Describe your idea in detail in the textarea
2. **Click "Validate Idea"** - The AI will analyze your idea (takes 10-30 seconds)
3. **Review Results** - Get comprehensive analysis with scores and recommendations
4. **Take Action** - Follow the specific recommendations provided

## 📁 Project Structure

```
├── app/
│   ├── api/validate/       # OpenAI API integration
│   ├── globals.css         # Global styles and theme
│   ├── layout.tsx          # Root layout with toast provider
│   └── page.tsx            # Main page
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── validator-header.tsx
│   │   ├── idea-input-form.tsx
│   │   ├── validation-results.tsx
│   │   └── validator-footer.tsx
│   └── startup-idea-validator.tsx  # Main component
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── api.ts              # API utility functions
│   └── utils.ts            # Utility functions
```

## 🔧 Configuration

### Environment Variables

| Variable         | Description         | Required |
| ---------------- | ------------------- | -------- |
| `OPENAI_API_KEY` | Your OpenAI API key | Yes      |

### Customization

- **Colors**: Update the color palette in `app/globals.css`
- **Animations**: Modify animations in individual components
- **Prompt**: Customize the AI prompt in `app/api/validate/route.ts`

## 🚨 Error Handling

The app includes comprehensive error handling for:

- Invalid API keys
- API quota exceeded
- Network errors
- Invalid responses
- Rate limiting

Built with ❤️ using Next.js, TailwindCSS, and OpenAI
