# SaintVision AI Agent 🚀

**Powerful AI Agent with Image Generation, Multi-Model Chat, and Business Automation**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/saint-vision-ai-cookin-knowledge/v0-saint-sal-ch-at-crackin)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

## 🎯 Features

### AI Capabilities
- **Multi-Model Chat**: Claude 3.5 Sonnet, GPT-4 Turbo, Azure GPT-5
- **Image Generation**: DALL-E 3 (OpenAI & Azure)
- **Real-time Responses**: Streaming chat interface
- **Context-Aware**: Maintains conversation history

### Business Forms
- **Credit Pull Application**: Integrated with FICO credit check
- **Investment Intake**: Accredited investor qualification
- **Merchant Services**: Payment processing & payroll
- **Tech Development**: Project intake & scoping

### Integrations
- ✅ GoHighLevel CRM (automatic lead capture)
- ✅ Resend Email (instant notifications)
- ✅ Apollo Analytics tracking
- ✅ Google Tag Manager
- ✅ Stripe Payments (ready)
- ✅ Azure AI Services

## 🚀 Quick Deployment to Vercel

### Simple 3-Step Deploy:

1. **Push to GitHub** (already done ✅)
2. **Go to Vercel**: https://vercel.com/new
3. **Import this repo** and add environment variables

### Required Environment Variables:
```env
ANTHROPIC_API_KEY=your_key
OPENAI_API_KEY=your_key
GHL_API_KEY=your_key
RESEND_API_KEY=your_key
AGENT_EMAIL=ryan@cookinknowledge.com
```

That's it! Vercel handles everything else automatically.

## 📱 What You Get

- **Homepage** (`/`): AI Chat + Image Generation dashboard
- **Credit Pull** (`/forms/credit-pull`): Credit application form
- **Investment** (`/forms/investment`): Investment intake
- **Merchant Services** (`/forms/merchant-services`): Business services
- **Tech Intake** (`/forms/tech-intake`): Development projects

All forms auto-submit to your GoHighLevel CRM!

## 🔌 API Endpoints

- `POST /api/chat` - Multi-model AI chat
- `POST /api/generate-image` - DALL-E 3 image generation
- `POST /api/forms/*` - Form submissions

## 🛠️ Local Development (Optional)

```bash
git clone https://github.com/SaintVisionAi/v0-saint-sal-ch-at-crackin.git
cd v0-saint-sal-ch-at-crackin
npm install
npm run dev
```

## 🎨 Customization

### Update Tracking IDs
Edit `src/app/layout.tsx`:
- Apollo App ID (Line 32)
- GHL Tracking ID (Line 43)  
- Google Tag Manager ID (Line 57)

### Modify Forms
Forms: `src/app/forms/[name]/page.tsx`
APIs: `src/app/api/forms/[name]/route.ts`

## 📊 Built-in Tracking

✅ Apollo.io visitor tracking
✅ Google Tag Manager events
✅ GoHighLevel lead capture
✅ Email notifications via Resend

## 🔐 Security Note

All API keys are stored securely in `.env.local` and Vercel environment variables. Never commit API keys to git!

## 🤝 Support

**Email**: ryan@cookinknowledge.com  
**Phone**: +1 (949) 997-2097

---

**Built with ❤️ by SaintVision AI**  
Visit: [https://saintvisiongroup.com](https://saintvisiongroup.com)
