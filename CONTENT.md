# Portfolio Content Guide

Single source of truth: `src/data/content.ts`

## How to update

| Item | File / location |
|------|-----------------|
| Name, bio, links | `identity` in `content.ts` |
| Education dates | `education` in `content.ts` |
| Evaluation status | `thesisCaseStudy.evaluation` in `content.ts` (add metrics only after protocol verification) |
| Manuscript status | `thesisCaseStudy.status`, `publications` |
| Projects | `projects` array |
| Experience | `experience` array (verify dates before adding roles) |
| Skills | `skillGroups` |
| CV download | `public/Naghmeh_Melody_Nazar_Research_CV.pdf` (research/health-AI CV) |
| SEO title/description | `seo` in `content.ts` and `index.html` |

## VERIFY WITH OWNER before publishing

- [ ] Exact manuscript title and author order before adding a formal citation
- [ ] Bahr Academy role (currently omitted — confirm title, employer, dates)
- [ ] Verified dataset count for COVID social-media project (do not claim "millions" without evidence)
- [ ] CCTV chatbot support-reduction metrics (removed from site)
- [ ] Golrang / Erole performance improvement percentages (conservative highlights only in Experience)
- [ ] Reproducible latency benchmark if adding inference timing claims
- [ ] Verify future GPA changes with the owner (currently 3.44, owner-confirmed)

## Deployment

```bash
npm run build
npm run deploy
```

Site: https://melodynazar.com
