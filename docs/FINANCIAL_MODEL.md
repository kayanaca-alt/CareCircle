# Financial Model — Kinovia

> Revenue projections, unit economics, and cost structure for years 1–3.

---

## 1. Pricing Strategy

| Tier | Monthly | Annual | Target Segment |
|------|---------|--------|----------------|
| **MVP** (launch pricing) | $15/mo | $150/yr | Early adopters, direct-to-consumer |
| **Full Launch** (2027) | $25/mo | $250/yr | Standard family plan |
| **Employer Benefit** (B2B) | $5–10/employee/mo | — | Enterprise distribution |
| **Insurer Partnership** (B2B) | $3–8/member/mo | — | Health plan distribution |

**Launch strategy:** Lock early adopters at $15/mo lifetime rate (grandfather policy). Increases to $25/mo at full launch. Annual discount effectively gives 2 months free.

---

## 2. Unit Economics

### Customer Acquisition Cost (CAC)

| Channel | Cost per Acquisition | Volume Share (Year 1) |
|---------|---------------------|----------------------|
| Content marketing / SEO | $40–60 | 40% |
| Word-of-mouth / referrals | $10–20 | 35% |
| Social media / community | $50–80 | 15% |
| Paid ads (FB, Google) | $80–120 | 10% |

**Blended CAC Year 1:** ~$50–70 per family  
**Blended CAC Year 3:** ~$30–50 (as organic/referral share grows)

### Lifetime Value (LTV)

| Metric | Conservative | Expected | Optimistic |
|--------|-------------|----------|------------|
| Average monthly revenue | $18 | $20 | $22 |
| Average customer lifespan (months) | 18 | 24 | 36 |
| **LTV** | **$324** | **$480** | **$792** |
| LTV:CAC ratio (at $60 CAC) | 5.4× | 8.0× | 13.2× |

### Churn

| Period | Expected Monthly Churn | Annual Equivalent |
|--------|----------------------|-------------------|
| First 3 months | 8–10% | (new customer acclimation) |
| Months 4–12 | 3–5% | 46–54% annual |
| Year 2+ | 2–3% | 22–31% annual |

**Key insight:** Churn drops significantly once a family has activated 2+ features (bills + documents). Activation is the leading retention indicator.

---

## 3. Three-Year Projections

### Year 1 — Direct-to-Consumer Only

| Month | New Families | Total Families | MRR | Monthly Churn |
|-------|-------------|---------------|-----|---------------|
| Q1 | 30 | 30 | $510 | — |
| Q2 | 40 | 65 | $1,170 | 8% |
| Q3 | 50 | 100 | $1,900 | 5% |
| Q4 | 60 | 125 | $2,500 | 4% |

> **Year 1 Total:** ~200 families acquired, ~125 active at year-end  
> **Year 1 ARR:** ~$48,000 ($4,000 MRR avg over year)  
> **Year 1 Run-Rate ARR (Dec):** ~$30,000

### Year 2 — DTC + Employer Deals

**Direct-to-consumer:** 800 new families (total active: ~650 by year-end)

**Employer partnerships:** 2 deals closed
- Each employer: 500 eligible employees × 15% adoption = ~75 families each
- B2B revenue: $8/employee/mo × 1,000 eligible = $8,000/mo

| Quarter | DTC Families | Employers | Employer Members | Total MRR |
|---------|-------------|-----------|-----------------|-----------|
| Q1 | 200 | 1 | 60 | $4,600 |
| Q2 | 350 | 2 | 130 | $8,700 |
| Q3 | 500 | 2 | 140 | $11,600 |
| Q4 | 650 | 2 | 150 | $15,500 |

> **Year 2 ARR:** ~$300,000 ($25,000 MRR avg over year)  
> **Year 2 Run-Rate ARR (Dec):** ~$186,000  
> **B2B % of revenue:** 35%

### Year 3 — Scale + Enterprise

**Direct-to-consumer:** 3,500 new families (total active: ~2,800 by year-end)

**Enterprise partnerships:** 5 deals (3 employers + 2 health insurers)
- Employer average: 1,200 eligible employees × 20% adoption = 240 families each
- Insurer average: 5,000 eligible members × 8% adoption = 400 families each

| Quarter | DTC Families | Enterprise Deals | Enterprise Members | Total MRR |
|---------|-------------|-----------------|-------------------|-----------|
| Q1 | 1,200 | 3 | 1,100 | $39,000 |
| Q2 | 1,800 | 4 | 1,800 | $61,000 |
| Q3 | 2,400 | 5 | 2,600 | $86,000 |
| Q4 | 2,800 | 5 | 3,200 | $106,000 |

> **Year 3 ARR:** ~$1,500,000 ($125,000 MRR avg over year)  
> **Year 3 Run-Rate ARR (Dec):** ~$1,270,000  
> **B2B % of revenue:** 55%

---

## 4. Cost Structure

### Fixed Costs (Monthly)

| Category | Year 1 | Year 2 | Year 3 | Notes |
|----------|--------|--------|--------|-------|
| **Hosting & Infrastructure** | $500 | $1,200 | $2,000 | Vercel/Supabase/Redis/CDN |
| **SaaS / Tools** | $200 | $500 | $800 | Sentry, Auth0, Linear, Slack |
| **Compliance (HIPAA/SOC 2)** | $0 | $1,000 | $3,000 | Audit prep, BAAs, monitoring |
| **Total Fixed** | **$700/mo** | **$2,700/mo** | **$5,800/mo** | |

### Variable Costs (% of Revenue)

| Category | Year 1 | Year 2 | Year 3 | Notes |
|----------|--------|--------|--------|-------|
| **Payment processing** | 2.9% | 2.9% | 2.9% | Stripe fees |
| **Sales & Marketing** | 20% | 20% | 20% | Content, ads, partnerships |
| **Customer support** | 5% | 5% | 5% | Intercom/chat, part-time support |
| **Total Variable** | **~28%** | **~28%** | **~28%** | |

### Personnel Costs

| Role | Year 1 | Year 2 | Year 3 |
|------|--------|--------|--------|
| Founder / Full-stack engineer | 1 FTE | 1 FTE | 2 FTE |
| Part-time support | 0.25 FTE | 0.5 FTE | 1 FTE |
| Sales / Partnerships | — | 0.5 FTE ($40K) | 1 FTE ($80K) |
| Design / Product | — | 0.25 FTE | 0.5 FTE |
| **Total Personnel** | **~$60K** | **~$130K** | **~$220K** |

---

## 5. P&L Summary

| Item | Year 1 | Year 2 | Year 3 |
|------|--------|--------|--------|
| **Revenue (ARR)** | $48,000 | $300,000 | $1,500,000 |
| **Cost of Revenue** | $1,680 (3.5%) | $8,700 (2.9%) | $43,500 (2.9%) |
| **Gross Profit** | $46,320 | $291,300 | $1,456,500 |
| **Gross Margin** | **96.5%** | **97.1%** | **97.1%** |
| | | | |
| **Operating Expenses** | | | |
| Infrastructure | $8,400 | $32,400 | $69,600 |
| SaaS/Tools | $2,400 | $6,000 | $9,600 |
| Compliance | $0 | $12,000 | $36,000 |
| Personnel | $60,000 | $130,000 | $220,000 |
| Sales & Marketing | $9,600 | $60,000 | $300,000 |
| **Total OpEx** | **$80,400** | **$240,400** | **$635,200** |
| | | | |
| **EBITDA** | **($34,080)** | **$50,900** | **$821,300** |
| **EBITDA Margin** | **−71%** | **17%** | **55%** |

---

## 6. Key Metrics Summary

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| **ARR** | $48,000 | $300,000 | $1,500,000 |
| **MRR (Dec)** | $4,000 | $25,000 | $106,000 |
| **Active Families** | 125 | 800 | 6,000 |
| **Monthly Churn** | 5% | 3.5% | 2.5% |
| **Avg Revenue/Family/Mo** | $20 | $22 | $22 |
| **Blended CAC** | $60 | $50 | $40 |
| **LTV** | $360 | $440 | $528 |
| **LTV:CAC** | 6.0× | 8.8× | 13.2× |
| **Gross Margin** | 96.5% | 97.1% | 97.1% |
| **EBITDA** | ($34K) | $51K | $821K |
| **B2B Revenue %** | 0% | 35% | 55% |

---

## 7. Sensitivity Analysis

### Impact of Churn on LTV:CAC

| Monthly Churn | Avg Lifespan | LTV (at $20/mo) | LTV:CAC (at $60) |
|--------------|-------------|-----------------|-------------------|
| 3% | 33 months | $660 | 11.0× |
| 4% | 25 months | $500 | 8.3× |
| 5% | 20 months | $400 | 6.7× |
| 8% | 12.5 months | $250 | 4.2× |

**Breakeven churn rate:** ~8.3% (below this, LTV:CAC > 3.0×)

### Pricing Sensitivity

| Avg Monthly Price | Families Needed for $1M ARR |
|------------------|---------------------------|
| $15 | 5,556 |
| $20 | 4,167 |
| $25 | 3,333 |
| $30 | 2,778 |

---

## 8. Funding & Exit

### Pre-Seed / Bootstrapped Path

- **Year 1:** Funded through owner savings / part-time consulting
- **Year 2:** Revenue covers OpEx by Q3. No external funding required if growth targets hit
- **Year 3:** Strongly profitable. At 55% EBITDA margin with $1.5M ARR → potential acquisition target

### Target Exit Scenarios (Year 3–4)

| Scenario | ARR | Multiple | Enterprise Value |
|----------|-----|----------|-----------------|
| Conservative | $1.0M | 5× | $5.0M |
| Expected | $1.5M | 6× | $9.0M |
| Optimistic | $2.5M | 8× | $20.0M |

**Likely acquirers:** Caregiving platforms (Care.com, Papa), health insurers (UnitedHealthcare, Humana), aging-in-place tech (Best Buy Health/GreatCall, Amazon Alexa Health), HR benefits platforms (Rippling, Gusto).

---

*Last updated: July 2026. All figures are projections and should be reviewed quarterly.*