# Ajil-Go - Micro Task Marketplace

**Ajil-Go** нь TaskRabbit-тэй төстэй, хэрэглэгчид жижиг ажил үүсгэж, бусад хэрэглэгчид тэдгээр дээр ажиллах боломжтой хоёр талт зах зээлийн платформ юм.

## Төслийн тухай

Энэхүү платформ нь:
- Ажил олгогчид (Task Posters) өөрсдийн хийлгэхийг хүсч буй ажлуудыг нийтэлдэг
- Ажилчид (Workers) ажил дээр тендер өгч, ажил хүлээн авдаг
- Хэрэглэгчид хоорондоо мессеж солилцдог
- Ажил дууссаны дараа харилцан үнэлгээ, сэтгэгдэл үлдээдэг
- Төлбөрийн хяналт (simulation)
- Байршлаар нь ажил хайх боломжтой (geospatial search)

## Гол онцлог функцууд

### Нэвтрэх & Хэрэглэгчийн систем
- Email/нууц үгээр бүртгүүлэх
- Google-ээр нэвтрэх
- Хэрэглэгчийн профайл (био, утас, зураг, байршил)
- Ур чадвар (skills) нэмэх/устгах
- Dashboard, статистик

### Ажлын удирдлага
- Ажил үүсгэх (гарчиг, тайлбар, төсөв, хугацаа)
- Ажил засварлах/устгах
- Ажлын ангилал (categories)
- Ажилд шаардлагатай ур чадварууд
- Байршил (алсаас эсвэл газар дээр нь)
- Хавсралт файлууд (зураг, баримт)
- Ажил хайх, шүүлт хийх
- Pagination

### Тендерийн систем (Bidding)
- Ажил дээр үнийн санал өгөх
- Тендерүүдийг харах
- Тендер зөвшөөрөх/татгалзах
- Өөрийн тендер буцаах

### Ажлын урсгал (Workflow)
- Ажлын төлөв (open → assigned → in-progress → completed → reviewed)
- Ажил эхлүүлэх
- Ажил дуусгах
- Ажлын гүйцэтгэл батлах

### Үнэлгээ & Сэтгэгдэл
- Ажил хийгчийг үнэлэх
- Ажил олгогчийг үнэлэх
- Дундаж үнэлгээ харуулах
- Түүх харах

Дэлгэрэнгүй функц жагсаалтыг `features.md` файлаас үзнэ үү.

## 🛠 Технологийн стэк

### Frontend (Web App)
- **Next.js 16** - React framework (App Router)
- **React 19** - UI library
- **TailwindCSS 4** - CSS framework
- **shadcn/ui** - UI components
- **Radix UI** - Headless components
- **TanStack Query** - Data fetching & caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **AI SDK** - Google Generative AI integration
- **Redis** - Geospatial хайлт
- **Lucide React** - Icons

### Backend (API Server)
- **Fastify** - Fast web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **PostgreSQL** - Database
- **Better Auth** - Authentication
- **Fastify Type Provider Zod** - Type-safe routing

### Monorepo & Tooling
- **Turborepo** - Monorepo build system
- **pnpm** - Package manager
- **Biome** - Linting & formatting
- **TypeScript** - Type checking

### Packages
```
packages/
├── auth/        # Better Auth тохиргоо
├── contract/    # API гэрээ (type-safe API)
├── config/      # Хуваалцсан тохиргоо
└── db/          # Prisma schema & queries
```

## Урьдчилсан шаардлага

Эдгээр программууд таны компьютерт суусан байх ёстой:

- **Node.js** (v20 эсвэл түүнээс дээш)
- **pnpm** (v10.18.3 эсвэл түүнээс дээш)
- **PostgreSQL** (v14 эсвэл түүнээс дээш)

### Суулгах:

```bash
# Node.js татаж суулгах
# https://nodejs.org/ хаягаас

# pnpm суулгах
npm install -g pnpm

# PostgreSQL суулгах
# macOS
brew install postgresql@16

# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# Windows
# https://www.postgresql.org/download/windows/ хаягаас
```

## Суулгах & Ажиллуулах заавар

### 1. Repository-г clone хийх

```bash
git clone <repository-url>
cd ajil-go
```

### 2. Dependencies суулгах

```bash
pnpm install
```

### 3. Environment Variables тохируулах

#### 3.1. Web App (.env)

`apps/web/.env` файл үүсгээд дараах мэдээллийг оруулна уу:

```bash
# Backend API-ийн хаяг
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

#### 3.2. Server (.env)

`apps/server/.env` файл үүсгээд дараах мэдээллийг оруулна уу:

```bash
# PostgreSQL database-ийн холболтын мэдээлэл
DATABASE_URL=postgresql://user:password@localhost:5432/ajilgo

# Better Auth тохиргоо
BETTER_AUTH_SECRET=your-secret-key-here-minimum-32-characters-long
BETTER_AUTH_URL=http://localhost:3000
CLAIM_URL=http://localhost:3001

# CORS тохиргоо
CORS_ORIGIN=http://localhost:3001

# Google OAuth (заавал биш, Google нэвтрэх хэрэг болвол)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**💡 Анхаарах:**
- `DATABASE_URL`: PostgreSQL database-ийн холболтын string
- `BETTER_AUTH_SECRET`: Random, 32+ тэмдэгт урт нууц түлхүүр (аюулгүй байлгах!)
- Google OAuth: [Google Cloud Console](https://console.cloud.google.com/) дээр OAuth 2.0 Client ID үүсгэх

### 4. Database тохируулах

```bash
# Prisma client үүсгэх
pnpm run db:generate

```bash
# Prisma schema-г database-д push хийх
pnpm run db:push

# Prisma Studio нээх (Database-ийг browser дээр харах)
pnpm run db:studio
```

### 5. Development server ажиллуулах

#### Бүх app-уудыг нэг дор ажиллуулах:
```bash
pnpm run dev
```

Энэ нь автоматаар дараах хоёр сервер асаана:
- Web App: http://localhost:3001
- API Server: http://localhost:3000

#### Тусад нь ажиллуулах:
```bash
# Зөвхөн Frontend
pnpm run dev:web

# Зөвхөн Backend API
pnpm run dev:server
```

### 6. Browser дээр нээх

Web application-г нээх:
```
http://localhost:3001
```

API documentation (шалгах бол):
```
http://localhost:3000
```

## Бүх скриптүүд

| Скрипт | Тайлбар |
|--------|---------|
| `pnpm run dev` | Бүх app-уудыг development mode-оор ажиллуулах |
| `pnpm run dev:web` | Зөвхөн web app ажиллуулах |
| `pnpm run dev:server` | Зөвхөн API server ажиллуулах |
| `pnpm run build` | Бүх app-уудыг production build хийх |
| `pnpm run check-types` | TypeScript type check хийх |
| `pnpm run check` | Biome formatter & linter ажиллуулах |
| `pnpm run db:push` | Prisma schema-г database-д push хийх |
| `pnpm run db:studio` | Prisma Studio нээх (database UI) |
| `pnpm run db:generate` | Prisma Client generate хийх |
| `pnpm run db:migrate` | Database migration ажиллуулах |

## Төслийн бүтэц

```
ajil-go/
├── apps/
│   ├── web/                    # Frontend (Next.js 16)
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router pages
│   │   │   ├── components/    # React components
│   │   │   └── lib/           # Utility functions
│   │   ├── public/            # Static files
│   │   └── package.json
│   │
│   └── server/                # Backend API (Fastify)
│       ├── src/
│       │   ├── routes/        # API routes
│       │   ├── plugins/       # Fastify plugins
│       │   └── index.ts       # Server entry point
│       └── package.json
│
├── packages/
│   ├── auth/                  # Better Auth configuration
│   ├── contract/              # API contracts (type-safe)
│   ├── config/                # Shared configurations
│   └── db/                    # Prisma schema & client
│       ├── prisma/
│       │   └── schema.prisma  # Database schema
│       └── src/
│
├── .github/                   # GitHub Actions, workflows
├── .turbo/                    # Turborepo cache
├── node_modules/              # Dependencies
├── biome.json                 # Biome configuration
├── turbo.json                 # Turborepo configuration
├── pnpm-workspace.yaml        # pnpm workspace config
├── package.json               # Root package.json
└── README.md                  # Энэ файл
```

## Хөгжүүлэлтийн зөвлөмжүүд

### Database өөрчлөх үед

1. `packages/db/prisma/schema.prisma` файлыг засварлах
2. Database-д өөрчлөлт оруулах:
   ```bash
   pnpm run db:push
   ```
3. Production-д migration үүсгэх:
   ```bash
   pnpm run db:migrate
   ```

### Code formatting & linting

```bash
# Автоматаар засварлах
pnpm run check

# Зөвхөн шалгах (засварлахгүй)
pnpm run check --write=false
```

### Type checking

```bash
pnpm run check-types
```

### Database харах

```bash
pnpm run db:studio
```

Browser дээр http://localhost:5555 хаягаар нээгдэнэ.

## Багийн гишүүдийн хуваарилалт

| Гишүүн | Хариуцах хэсэг | Үүрэг |
|------|---------------|------|
| **Анар** | Frontend + Auth & Users | Login/Register UI, профайл удирдлага, dashboard, Auth API холболт |
| **Бат-Эрдэнэ** | Frontend | UI компонентууд, API холболт, responsive дизайн |
| **Авиддарам** | Backend | Tasks CRUD, ангилал, хайлт, bidding, workflow логик |
| **Оюут** | UI/UX (Figma) | Figma дизайн, user flow, requirement тодорхойлолт |
| **Ач-Эрдэнэ** | DevOps | Kubernetes, AWS EKS, CI/CD pipeline, production deploy |
| **Төгөлдөр** | Deployment / Backend Support | Сервер тохиргоо, deploy орчин, release дэмжлэг |

---

## Асуудал гарвал

### Port аль хэдийн эзлэгдсэн байвал

```bash
# Port 3000 чөлөөлөх
lsof -ti:3000 | xargs kill

# Port 3001 чөлөөлөх
lsof -ti:3001 | xargs kill
```

### Database холбогдохгүй байвал

PostgreSQL ажиллаж байгаа эсэхийг шалгана уу:
```bash
# macOS
brew services start postgresql@16

# Ubuntu
sudo systemctl start postgresql

# Status шалгах
pg_isready
```

### Prisma алдаа өгвөл

```bash
# Prisma client дахин generate хийх
pnpm run db:generate

# Cache цэвэрлэх
rm -rf node_modules/.prisma
pnpm install
```

## Холбоос & баримт бичиг

- [Next.js Documentation](https://nextjs.org/docs)
- [Fastify Documentation](https://fastify.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://www.better-auth.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## Лиценз

Энэ төсөл нь [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)-ээр үүсгэгдсэн.

---

**Амжилт хүсье!** 🚀 Асуулт байвал багийн гишүүдээс лавлана уу.
