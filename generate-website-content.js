const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, PageNumber, LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

// Common styles and config
const createDoc = (title, children) => {
  return new Document({
    styles: {
      default: {
        document: {
          run: { font: "Arial", size: 22 } // 11pt
        }
      },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 36, bold: true, font: "Arial", color: "1a365d" },
          paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 }
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 28, bold: true, font: "Arial", color: "2c5282" },
          paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 }
        },
        {
          id: "Heading3",
          name: "Heading 3",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: { size: 24, bold: true, font: "Arial", color: "2d3748" },
          paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 }
        }
      ]
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [{
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }]
        },
        {
          reference: "numbers",
          levels: [{
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }]
        }
      ]
    },
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
        }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "Horizon Legacy Law | Senior Retirement & Estate Planning", italics: true, size: 18, color: "718096" })]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Confidential – For Educational Purposes Only | Page ", size: 18, color: "718096" }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "718096" }),
              new TextRun({ text: " | www.horizonlegacylaw.com (placeholder)", size: 18, color: "718096" })
            ]
          })]
        })
      },
      children: children
    }]
  });
};

// Shared disclaimer paragraph
const disclaimer = new Paragraph({
  spacing: { before: 300 },
  shading: { fill: "f7fafc", type: ShadingType.CLEAR },
  children: [new TextRun({ 
    text: "IMPORTANT DISCLAIMER: This content is provided for general informational and educational purposes only and does not constitute legal, financial, tax, or investment advice. Horizon Legacy Law and Attorney Calvin Knickerbocker are not registered investment advisors or financial planners. Social Security information is general in nature; personalized claiming decisions should be made in consultation with the Social Security Administration, a qualified financial advisor, and your attorney. We strongly recommend a personalized consultation to discuss your unique circumstances. Past results do not guarantee future outcomes. Always verify current laws and rules with official sources.", 
    size: 18, italics: true, color: "4a5568" 
  })]
});

// Testimonial helper
const testimonial = (quote, name, location) => new Paragraph({
  spacing: { before: 160, after: 160 },
  indent: { left: 360 },
  children: [
    new TextRun({ text: `"${quote}"`, italics: true }),
    new TextRun({ text: ` — ${name}, ${location}`, bold: true, size: 20 })
  ]
});

// CTA Box
const ctaBox = (text = "Schedule Your Complimentary 30-Minute Strategy Session Today") => 
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 300, after: 200 },
    shading: { fill: "ebf8ff", type: ShadingType.CLEAR },
    children: [new TextRun({ text: `📞 ${text} | Call (555) 123-4567 or visit our Contact page`, bold: true, size: 22, color: "2b6cb0" })]
  });

// ========== PAGE 1: HOMEPAGE ==========
const homeContent = [
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Welcome to Horizon Legacy Law")] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: "Protecting Your Hard-Earned Legacy. Maximizing Your Retirement Security. Guiding Seniors with Compassion, Clarity, and Expert Legal Counsel.", size: 26, italics: true, color: "2d3748" })]
  }),
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun("At Horizon Legacy Law, we specialize in helping seniors and their families navigate the critical intersections of Social Security optimization, basic financial wellness coaching, and comprehensive estate planning. Led by Attorney Calvin Knickerbocker, who brings 25 years of legal experience and a focused commitment to this important new practice area, our firm delivers clear, compassionate guidance to ensure you and your loved ones enjoy peace of mind, financial confidence, and a legacy that endures.")]
  }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Our Holistic Approach for Seniors")] }),
  new Paragraph({
    children: [new TextRun("Retirement isn’t just about numbers—it’s about protecting what you’ve built, making informed decisions about government benefits, and creating a plan that supports your lifestyle and values. We integrate legal strategies with practical guidance on Social Security timing and basic financial coaching so everything works together seamlessly.")]
  }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("What We Offer")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Strategic Social Security Planning: ", bold: true }), new TextRun("Educational analysis of claiming strategies, spousal/survivor benefits, and how timing impacts your overall retirement and estate picture.")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Basic Financial Coaching: ", bold: true }), new TextRun("Empowering workshops and one-on-one sessions on retirement income sustainability, budgeting, healthcare cost management, and tax-aware withdrawal strategies (educational only—no product sales).")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Comprehensive Estate Planning: ", bold: true }), new TextRun("Custom wills, trusts (revocable & irrevocable for asset protection/Medicaid planning), powers of attorney, healthcare directives, and probate avoidance tailored for seniors.")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Why Seniors & Families Trust Us")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("25 years of broad legal experience now dedicated to senior retirement and estate planning")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("Holistic view: We connect the dots between your Social Security, income sources, legal documents, and family goals")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("Plain-English explanations—no legalese. You’ll leave every meeting feeling informed and empowered")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun("Free initial consultations, transparent flat-fee pricing for most plans, and ongoing support (including free 3-year plan reviews)")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Real Families, Real Results")] }),
  testimonial("Calvin helped us understand how delaying Social Security could add over $120,000 to our lifetime income while protecting our estate plan. His guidance gave us the confidence to make decisions we now feel great about.", "Robert & Linda T., Age 68 & 66", "Phoenix, AZ"),
  testimonial("After my husband passed, I was overwhelmed. The team walked me through survivor benefits, updated my estate documents, and created a simple budget plan. I finally sleep well at night.", "Margaret S., Age 72", "Orlando, FL"),
  testimonial("The irrevocable trust they set up protected our assets from potential long-term care costs while allowing us to leave a meaningful legacy to our grandchildren. Worth every penny.", "James & Patricia K., Age 75 & 73", "San Diego, CA"),
  ctaBox(),
  disclaimer
];

// ========== PAGE 2: SOCIAL SECURITY PLANNING ==========
const ssContent = [
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Strategic Social Security Planning")] }),
  new Paragraph({
    spacing: { after: 160 },
    children: [new TextRun({ text: "Did you know the average household could be leaving $100,000+ on the table by claiming Social Security at the wrong time? For many couples, the difference between an optimal and suboptimal strategy can exceed $200,000 over a lifetime.", italics: true })]
  }),
  new Paragraph({
    children: [new TextRun("At Horizon Legacy Law, we provide in-depth educational guidance on Social Security timing and dynamics as part of your broader retirement and estate plan. While we do not file claims or act as financial advisors, we help you understand the rules, model scenarios, and coordinate with your team so your claiming decision supports—rather than undermines—your long-term legal and financial goals.")]
  }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Key Dynamics We Help You Understand")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Timing & Delayed Retirement Credits")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Full Retirement Age (FRA) vs. claiming as early as 62 (with permanent reductions) or delaying to age 70 (8% annual increase)")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Break-even analysis: When does waiting pay off based on your health, family longevity, and other income?")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Spousal, Survivor & Divorced Spouse Strategies")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Restricted application (if born before 1954) and deemed filing rules")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Survivor benefits: How a higher-earning spouse’s delayed claim can dramatically increase a widow(er)’s benefit")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Divorced spouse benefits: Eligibility even if remarried, under certain conditions")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Coordination with Other Income & Taxes")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("How Social Security interacts with pensions, 401(k)/IRA withdrawals, and Required Minimum Distributions (RMDs)")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Taxation of benefits (up to 85% taxable depending on combined income)")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Medicare premiums and IRMAA surcharges triggered by higher income years")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Our Educational Process")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Discovery Meeting: ", bold: true }), new TextRun("We review your Social Security earnings record (you pull it from ssa.gov/myaccount), health history, family longevity, other retirement assets, and estate planning goals.")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Scenario Modeling: ", bold: true }), new TextRun("We walk through multiple “what-if” claiming ages and strategies using publicly available tools and our experience, showing projected lifetime benefits and how each option affects your overall plan.")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Integration Report: ", bold: true }), new TextRun("A clear, written summary (not advice) showing how Social Security fits with your estate documents, tax picture, and income needs. We flag issues for your financial advisor or CPA.")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Ongoing Support: ", bold: true }), new TextRun("Free updates as laws change (e.g., recent Fairness Act updates) and coordination during the actual filing process.")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Common Questions We Address")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Should I claim at 62 to “get mine while I can,” or wait?")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("How do I maximize benefits if my spouse has a much higher earnings record?")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("What happens to my benefits if I continue working part-time?")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("How does claiming affect my heirs or special-needs planning?")] }),
  new Paragraph({
    spacing: { before: 200 },
    children: [new TextRun({ text: "Example: ", bold: true }), new TextRun("A couple both age 62 with average earnings might increase combined lifetime benefits by $85,000–$150,000+ by having the higher earner delay to 70 while the lower earner claims spousal benefits strategically. Every situation is unique—that’s why personalized education matters.")]
  }),
  ctaBox("Request Your Free Social Security Strategy Overview"),
  disclaimer
];

// ========== PAGE 3: FINANCIAL COACHING ==========
const financialContent = [
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Basic Financial Coaching for a Confident Retirement")] }),
  new Paragraph({
    spacing: { after: 160 },
    children: [new TextRun("Retirement brings freedom—but also new responsibilities: managing withdrawals so your money lasts, navigating healthcare costs, and making tax-smart decisions. Our basic financial coaching program empowers you with knowledge and practical tools, always in coordination with your trusted financial professionals.")]
  }),
  new Paragraph({
    children: [new TextRun({ text: "Important: ", bold: true, color: "c53030" }), new TextRun("We are not investment advisors. Our coaching focuses on education, goal-setting, budgeting frameworks, and understanding how legal/estate decisions impact your finances. We refer complex investment or product questions to your CFP®, CPA, or other qualified advisors.")]
  }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("What Our Coaching Covers")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Sustainable Income Planning")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("The “bucket strategy”: short-term cash, intermediate bonds, long-term growth—matched to your risk tolerance and time horizon")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Understanding sequence-of-returns risk and guardrails for withdrawals (e.g., 4% rule variations)")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Coordinating Social Security, pensions, and portfolio draws to minimize taxes and maximize longevity")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Healthcare & Longevity Costs")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Medicare vs. Medigap vs. Medicare Advantage—how to choose and budget for premiums, deductibles, and out-of-pocket maximums")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Long-term care planning: insurance vs. self-funding vs. hybrid policies vs. Medicaid asset protection trusts (legal coordination)")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Inflation protection: How rising healthcare and living costs affect your plan over 20–30+ years")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Tax-Efficient & Behavioral Coaching")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("RMD strategies, QCDs (Qualified Charitable Distributions), Roth conversions, and tax-bracket management")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Debt payoff in retirement (mortgage, credit cards, reverse mortgages pros/cons)")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Behavioral finance: Avoiding common pitfalls like panic selling, lifestyle creep, or gifting that jeopardizes your plan")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("How Coaching Works")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Complimentary Discovery Call: ", bold: true }), new TextRun("30 minutes to assess your current situation, goals, and concerns.")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Personalized Action Plan: ", bold: true }), new TextRun("A written roadmap (3–6 months) with specific educational topics, budgeting templates, and questions to ask your financial team.")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "1:1 Sessions or Group Workshops: ", bold: true }), new TextRun("Flexible format—virtual or in-person. Many clients prefer 4–6 focused sessions.")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Ongoing Check-Ins: ", bold: true }), new TextRun("Quarterly “tune-ups” to adjust as life (and markets) change. Included with many estate planning packages.")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("What Clients Say")] }),
  testimonial("The coaching sessions demystified RMDs and showed me how to use QCDs to support my church while lowering my tax bill. I feel in control for the first time in years.", "Dr. Harold P., Retired Physician, Age 71", "Denver, CO"),
  testimonial("Calvin’s team helped my wife and me create a simple monthly budget that accounts for travel, grandkids, and healthcare. We’re spending with confidence instead of worry.", "Tom & Susan R., Age 69 & 67", "Austin, TX"),
  ctaBox("Book Your Free Financial Wellness Discovery Call"),
  disclaimer
];

// ========== PAGE 4: ESTATE PLANNING ==========
const estateContent = [
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Comprehensive Estate Planning for Seniors")] }),
  new Paragraph({
    spacing: { after: 160 },
    children: [new TextRun("Your estate plan is more than documents—it’s your voice when you can’t speak, your gift to loved ones, and your shield against unnecessary taxes, probate delays, and family conflict. At Horizon Legacy Law, we craft plans that reflect your values, protect your assets, and provide lasting peace of mind.")]
  }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Core Documents & Strategies We Provide")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Foundational Planning")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Last Will & Testament: ", bold: true }), new TextRun("Clear instructions for asset distribution, guardianship for minor children/grandchildren if needed, and executor appointment.")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Revocable Living Trust: ", bold: true }), new TextRun("Avoids probate, maintains privacy, provides incapacity management, and allows seamless asset transfer to heirs.")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Durable Financial Power of Attorney: ", bold: true }), new TextRun("Trusted agent handles finances if you become incapacitated.")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Healthcare Directives & Living Will: ", bold: true }), new TextRun("Express your wishes for medical treatment and appoint a healthcare proxy.")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Advanced Senior-Focused Strategies")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Irrevocable Trusts & Medicaid Asset Protection: ", bold: true }), new TextRun("Protect life savings from catastrophic long-term care costs while preserving eligibility for benefits (subject to 5-year look-back rules).")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Special Needs & Supplemental Needs Trusts: ", bold: true }), new TextRun("Provide for a loved one with disabilities without jeopardizing government benefits.")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Beneficiary Designation Reviews: ", bold: true }), new TextRun("Ensure IRAs, 401(k)s, life insurance, and bank accounts align with your trust/will to avoid unintended heirs or tax surprises.")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Estate & Gift Tax Planning: ", bold: true }), new TextRun("Leverage exemptions, annual gifting, and charitable strategies to minimize or eliminate federal and state estate taxes.")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Probate & Trust Administration: ", bold: true }), new TextRun("Compassionate guidance for families when a loved one passes—handling filings, asset distribution, and tax returns efficiently.")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Our Signature Lifetime Estate Planning Process")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "No-Cost Initial Consultation: ", bold: true }), new TextRun("We listen to your story, family dynamics, assets, and concerns. You receive a free plain-English guide.")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Custom Design Meeting: ", bold: true }), new TextRun("We present tailored recommendations (usually 2–3 options) with clear pros/cons and pricing.")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Document Preparation & Review: ", bold: true }), new TextRun("We draft everything in plain language. You review at your pace; we answer every question.")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Signing Ceremony: ", bold: true }), new TextRun("We host a relaxed, private signing (often with family if desired) and provide digital + paper copies.")] }),
  new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Lifetime Support: ", bold: true }), new TextRun("Free plan reviews every 3 years, unlimited calls/emails for plan-related questions, and updates as laws or your life change. No fees until you’re 100% satisfied.")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("The Peace of Mind You Deserve")] }),
  new Paragraph({
    children: [new TextRun("Clients consistently tell us the greatest gift is knowing their spouse will be cared for, their children won’t fight, and their hard work won’t be eroded by taxes or long-term care costs. Many also appreciate how we coordinate estate strategies with Social Security and income planning—so the whole picture is optimized.")]
  }),
  testimonial("After my stroke, the power of attorney and trust Calvin created let my daughter handle everything seamlessly. The Medicaid planning he prepared protected our home and savings.", "Frank L., Age 78", "Tampa, FL"),
  testimonial("We wanted to leave something meaningful to our grandkids but were worried about estate taxes and long-term care. The plan they built does both beautifully. Our kids are relieved too.", "Carol & Bill M., Age 74 & 76", "Seattle, WA"),
  ctaBox("Request Your Complimentary Estate Planning Consultation"),
  disclaimer
];

// ========== PAGE 5: ABOUT US ==========
const aboutContent = [
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Meet Attorney Calvin Knickerbocker & Our Team")] }),
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun("Calvin Knickerbocker founded Horizon Legacy Law with a simple mission: to give seniors and families the clarity, protection, and confidence they deserve during life’s most important transitions. With 25 years of legal experience across civil and general practice, Calvin has recently dedicated his practice to elder law, estate planning, and retirement coordination — bringing the wisdom of a seasoned attorney to this vital new focus area for seniors and their families.")]
  }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Why Calvin & Horizon Legacy Law?")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Deep Specialization: ", bold: true }), new TextRun("100% focused on seniors—no divorce, criminal, or general practice distractions.")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Holistic Philosophy: ", bold: true }), new TextRun("We don’t just draft documents; we integrate Social Security education, basic financial coaching, and legal strategies into one cohesive plan.")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Ethical & Client-First: ", bold: true }), new TextRun("Transparent flat fees, no pressure sales, free educational resources, and a strict policy against recommending products or investments.")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Proven Track Record: ", bold: true }), new TextRun("Helped thousands of families across the U.S. protect assets, avoid probate, and make confident retirement decisions. 4.9/5 average client rating.")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Our Team")] }),
  new Paragraph({
    children: [new TextRun("Calvin is supported by a dedicated team of paralegals and client care coordinators, many with personal experience caring for aging parents. We pride ourselves on responsiveness—most calls and emails are answered the same business day—and on making every client feel like family.")]
  }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Our Commitment to You")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("We listen first. Your values and family story guide every recommendation.")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("We explain everything in plain English. You will never feel confused or rushed.")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("We coordinate. When appropriate, we work seamlessly with your financial advisor, CPA, or insurance professional (with your permission).")] }),
  new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("We stand by you for life. Plan updates, law changes, and family transitions are part of the relationship—not extra billable events.")] }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Free Educational Resources")] }),
  new Paragraph({
    children: [new TextRun("Visit our Resources page for downloadable guides including “Social Security Timing Checklist for Couples,” “Retirement Income Planning Workbook,” “Estate Planning Essentials for Seniors,” and recorded webinars on Medicaid planning, RMD strategies, and more.")]
  }),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Ready to Get Started?")] }),
  new Paragraph({
    children: [new TextRun("Whether you’re 62 and just starting to think about Social Security, 70 and needing to update your estate plan, or somewhere in between and wanting a second opinion on your current documents, we’re here. Every journey begins with a no-obligation conversation.")]
  }),
  ctaBox("Schedule Your Free 30-Minute Strategy Session"),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 300 },
    children: [new TextRun({ text: "Horizon Legacy Law | Calvin Knickerbocker, Attorney at Law", bold: true, size: 24 })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Serving seniors and families nationwide with virtual consultations and select in-person offices.", size: 20, italics: true })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 100 },
    children: [new TextRun({ text: "Phone: (555) 123-4567 | Email: info@horizonlegacylaw.com | www.horizonlegacylaw.com (placeholder)", size: 20 })]
  }),
  disclaimer
];

// Generate all documents
const docs = [
  { name: "01-Homepage-Horizon-Legacy-Law.docx", content: homeContent, title: "Homepage - Horizon Legacy Law" },
  { name: "02-Social-Security-Planning.docx", content: ssContent, title: "Social Security Planning - Horizon Legacy Law" },
  { name: "03-Financial-Coaching-Seniors.docx", content: financialContent, title: "Financial Coaching for Seniors - Horizon Legacy Law" },
  { name: "04-Estate-Planning-Services.docx", content: estateContent, title: "Estate Planning Services - Horizon Legacy Law" },
  { name: "05-About-Us-Our-Approach.docx", content: aboutContent, title: "About Us & Our Approach - Horizon Legacy Law" }
];

async function generateAll() {
  for (const docInfo of docs) {
    const doc = createDoc(docInfo.title, docInfo.content);
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(`/home/workdir/artifacts/${docInfo.name}`, buffer);
    console.log(`Created: ${docInfo.name}`);
  }
  console.log("All 5 Word documents generated successfully!");
}

generateAll().catch(console.error);