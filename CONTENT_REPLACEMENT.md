# Content replacement guide

Before go-live, replace every `[PLACEHOLDER]` in `src/config/site.ts`:

| Field | Action |
|-------|--------|
| `legalEntityName` | Registered company or trading name |
| `companyNumber` | Companies House number |
| `expert.name` | Full name as used in court |
| `expert.credentials` | Verified qualifications only |
| `expert.yearsExperience` | Accurate figure |
| `expert.expertAppointments` | Accurate figure |
| `expert.bioSummary` | Approved biography |
| `contact.phone` / `phoneTel` | Working instruction line |
| `contact.address` | Registered or service address |
| `regulatoryBodies` | ICAEW/ACCA/PII details |
| `testimonials` | Signed-off quotes or remove block |
| `socialLinks.linkedin` | Live profile URL |

Also update MDX article `author` frontmatter in `content/insights/*.mdx`.

Expert page body sections marked `[PLACEHOLDER]` in `src/app/experts/[slug]/page.tsx` should be expanded with real CV content.
