# Portfolio Content Guide

Single source of truth: `src/data/content.ts`

## How to update

| Item | File / location |
|------|-----------------|
| Name, bio, links | `identity` in `content.ts` |
| Education dates | `education` in `content.ts` |
| Thesis metrics | `thesisCaseStudy.results` in `content.ts` |
| Manuscript status | `thesisCaseStudy.status`, `publications` |
| Projects | `projects` array |
| Experience | `experience` array (verify dates before adding roles) |
| Skills | `skillGroups` |
| CV download | `public/Naghmeh_Melody_Nazar_Research_CV.pdf` (research/health-AI CV) |
| SEO title/description | `seo` in `content.ts` and `index.html` |

## VERIFY WITH OWNER before publishing

- [ ] Exact IEEE SLT 2026 manuscript title and author order (for formal citation)
- [ ] Bahr Academy role (currently omitted — confirm title, employer, dates)
- [ ] Verified dataset count for COVID social-media project (do not claim "millions" without evidence)
- [ ] CCTV chatbot support-reduction metrics (removed from site)
- [ ] Golrang / Erole performance improvement percentages (conservative highlights only in Experience)
- [ ] Reproducible latency benchmark if adding inference timing claims
- [ ] Official transcript if publishing GPA

## Deployment

```bash
npm run build
npm run deploy
```

Site: https://melodynazar.com
