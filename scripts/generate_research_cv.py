"""Generate the public research CV PDF and its accessible HTML counterpart.

The shared content below is the source of truth for both formats. Keep every claim
evidence-based: this is a faculty-outreach CV, not a marketing landing page.
Requires ReportLab and pypdf; run with ``python scripts/generate_research_cv.py``.
"""

from html import escape as html_escape
from pathlib import Path
from xml.sax.saxutils import escape as xml_escape

from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, TextStringObject
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
PDF_OUTPUT = PUBLIC / "Naghmeh_Melody_Nazar_Research_CV.pdf"
HTML_OUTPUT = PUBLIC / "Naghmeh_Melody_Nazar_Research_CV.html"

NAME = "Naghmeh (Melody) Nazar"
FOCUS = "FALL 2027 PHD APPLICANT | SPEECH ML | MULTIMODAL & TRUSTWORTHY AI"
LOCATION = "Los Angeles, CA"
PHONE_DISPLAY = "(818) 336-7271"
PHONE_HREF = "+18183367271"
EMAIL = "melodynzr@gmail.com"
PORTFOLIO = "https://melodynazar.com"
LINKEDIN = "https://linkedin.com/in/naghme-nazar"
GITHUB = "https://github.com/nzrnaghme"

RESEARCH_FOCUS = (
    "Fall 2027 PhD applicant with an M.S. in Computer Engineering and completed research in "
    "speech emotion recognition. Developed a four-class 2D ResNet-inspired CNN on RAVDESS and "
    "TESS, achieving 80.36% validation accuracy and 74.4% on a held-out mixed test set, with "
    "explicit limits on speaker-independent and cross-corpus claims. Broader interests include "
    "speech and multimodal learning, trustworthy and robust machine learning, affective computing, "
    "human-centered AI, and the safety of emerging AI systems. Brings 3+ years of production "
    "software engineering experience to building testable research systems."
)

RESEARCH_INTERESTS = (
    "speech processing, multimodal learning, trustworthy and robust machine learning, affective "
    "computing, human-centered AI, AI safety"
)

PROTOTYPE_URL = "https://github.com/nzrnaghme/RespondEmailAgent"

RESEARCH_EXPERIENCE = [
    {
        "title": "M.S. Thesis - Speech Emotion Recognition, CSUN",
        "date": "Aug 2026",
        "bullets": [
            {
                "text": (
                    "Developed a four-class 2D ResNet-inspired CNN on RAVDESS and TESS using "
                    "16 kHz audio and 128 x 128 log-Mel spectrograms."
                )
            },
            {
                "text": (
                    "On the current mixed-corpus split, achieved 80.36% validation accuracy and "
                    "74.4% held-out test accuracy; the split does not establish speaker-independent "
                    "or cross-corpus generalization."
                )
            },
            {
                "text": (
                    "Desktop latency and naturalistic-speech generalization remain unmeasured; no "
                    "deployment or clinical-validation claim is made."
                )
            },
        ],
    },
]

SELECTED_ENGINEERING_PROJECTS = [
    {
        "title": "GenAI Email & Scheduling Agent",
        "date": "2026",
        "bullets": [
            {
                "text": (
                    "Built an n8n workflow combining email classification, response generation, "
                    "and scheduling across OpenAI, Gmail, and Airtable."
                ),
                "link": PROTOTYPE_URL,
                "link_label": "github.com/nzrnaghme/RespondEmailAgent",
            },
            {
                "text": (
                    "Documented validation and human-approval boundaries for generated messages "
                    "and calendar actions."
                )
            },
        ],
    }
]

RESEARCH_OUTPUTS = [
    (
        "M.S. thesis - \"Real-Time Speech Emotion Recognition Using Optimized Deep Residual "
        "Networks,\" California State University, Northridge, Aug 2026. PDF available on request."
    ),
    (
        "Presenter - 40th Annual CSU Student Research Competition: M.S. speech emotion "
        "recognition research, 2026. Presentation materials available on request."
    ),
]

EDUCATION = [
    {
        "title": "M.S. in Computer Engineering, California State University, Northridge",
        "date": "Aug 2024 - Aug 2026",
        "detail": "Thesis advisor: Prof. Shahnam Mirzaei",
    },
    {
        "title": "B.S. in Computer Engineering, University of Science and Technology of Mazandaran",
        "date": "Aug 2016 - Mar 2021",
    },
]

PROFESSIONAL_EXPERIENCE = [
    {
        "title": "Senior Frontend Developer, Golrang Industrial Group - Tehran, Iran",
        "date": "Jul 2022 - Jul 2024",
        "bullets": [
            {
                "text": (
                    "Architected cross-platform applications with React Native and React.js PWA; "
                    "contributed UI implementation, state management, caching, performance "
                    "optimization, and code review."
                )
            }
        ],
    },
    {
        "title": "React Developer, Erole.ir - Tehran, Iran",
        "date": "Jun 2021 - Jun 2022",
        "bullets": [
            {
                "text": (
                    "Built React and Redux applications and integrated REST APIs and SignalR-based "
                    "real-time features."
                )
            }
        ],
    },
]

TECHNICAL_SKILLS = [
    (
        "Speech and machine learning",
        (
            "Python, TensorFlow, Keras, scikit-learn, NumPy, Pandas, 2D CNN/ResNet, "
            "log-Mel spectrograms, MFCCs"
        ),
    ),
    (
        "Research and evaluation",
        "experimental design, error analysis, cross-corpus evaluation, reproducible workflows",
    ),
    (
        "Engineering",
        (
            "C++, JavaScript, TypeScript, n8n, React, React Native, Node.js, REST APIs, "
            "Git, Linux"
        ),
    ),
]


NAVY = colors.HexColor("#17324d")
TEAL = colors.HexColor("#087f76")
INK = colors.HexColor("#202b3a")
MUTED = colors.HexColor("#526274")
RULE = colors.HexColor("#cad6df")

styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=22,
    leading=24,
    alignment=TA_CENTER,
    textColor=NAVY,
    spaceAfter=2,
)
focus_style = ParagraphStyle(
    "Focus",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.3,
    leading=11.2,
    alignment=TA_CENTER,
    textColor=TEAL,
    spaceAfter=3,
)
contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.8,
    leading=10.7,
    alignment=TA_CENTER,
    textColor=INK,
    spaceAfter=0,
)
section_style = ParagraphStyle(
    "Section",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=11,
    leading=12.4,
    textColor=NAVY,
    spaceBefore=4.5,
    spaceAfter=1,
)
body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.5,
    leading=11.25,
    textColor=INK,
    alignment=TA_LEFT,
    spaceAfter=1.8,
)
role_style = ParagraphStyle(
    "Role",
    parent=body_style,
    fontName="Helvetica-Bold",
    fontSize=9.7,
    leading=11.25,
    spaceAfter=0,
)
date_style = ParagraphStyle(
    "Date",
    parent=body_style,
    fontName="Helvetica-Bold",
    fontSize=9,
    leading=10.6,
    textColor=MUTED,
    alignment=TA_LEFT,
    spaceAfter=0,
)
small_style = ParagraphStyle(
    "Small",
    parent=body_style,
    fontSize=8.8,
    leading=10.4,
    textColor=MUTED,
)
bullet_style = ParagraphStyle(
    "Bullet",
    parent=body_style,
    fontSize=9.4,
    leading=11.15,
    leftIndent=9,
    firstLineIndent=-8,
    spaceAfter=1.1,
)


def section(title: str):
    return [
        Paragraph(title.upper(), section_style),
        HRFlowable(width="100%", thickness=0.55, color=RULE, spaceBefore=0, spaceAfter=3),
    ]


def role_line(title: str, date: str):
    table = Table(
        [[Paragraph(xml_escape(title), role_style), Paragraph(xml_escape(date), date_style)]],
        colWidths=[6.05 * inch, 1.45 * inch],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]
        )
    )
    return table


def pdf_bullet(item: dict[str, str]):
    text = f"- {xml_escape(item['text'])}"
    if item.get("link"):
        text += (
            f' <link href="{item["link"]}" color="#087f76">'
            f'{xml_escape(item["link_label"])}</link>'
        )
    return Paragraph(text, bullet_style)


def pdf_metadata(canvas, _doc):
    canvas.setTitle(f"{NAME} - Research CV")
    canvas.setAuthor(NAME)
    canvas.setSubject(
        "Fall 2027 PhD applicant CV: speech ML research and interests in multimodal and trustworthy AI"
    )
    canvas.setKeywords(
        "speech processing, multimodal learning, trustworthy machine learning, robust evaluation, "
        "affective computing, human-centered AI, AI safety, PhD applicant"
    )


def add_pdf_language_metadata() -> None:
    reader = PdfReader(str(PDF_OUTPUT))
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    writer._root_object.update({NameObject("/Lang"): TextStringObject("en-US")})
    writer.add_metadata(
        {
            "/Title": f"{NAME} - Research CV",
            "/Author": NAME,
            "/Subject": (
                "Fall 2027 PhD applicant CV: speech ML research and interests in multimodal and trustworthy AI"
            ),
            "/Keywords": (
                "speech processing; multimodal learning; trustworthy machine learning; robust "
                "evaluation; affective computing; human-centered AI; AI safety"
            ),
        }
    )
    temporary = PDF_OUTPUT.with_suffix(".tmp.pdf")
    with temporary.open("wb") as handle:
        writer.write(handle)
    temporary.replace(PDF_OUTPUT)


def generate_pdf() -> None:
    story = [
        Paragraph(NAME, name_style),
        Paragraph(FOCUS, focus_style),
        Paragraph(
            f'{xml_escape(LOCATION)} | {xml_escape(PHONE_DISPLAY)} | '
            f'<link href="mailto:{EMAIL}" color="#087f76">{EMAIL}</link>',
            contact_style,
        ),
        Paragraph(
            f'<link href="{PORTFOLIO}" color="#087f76">melodynazar.com</link> | '
            f'<link href="{LINKEDIN}" color="#087f76">linkedin.com/in/naghme-nazar</link> | '
            f'<link href="{GITHUB}" color="#087f76">github.com/nzrnaghme</link>',
            contact_style,
        ),
        Spacer(1, 3),
    ]

    story.extend(section("Research Focus"))
    story.append(Paragraph(xml_escape(RESEARCH_FOCUS), body_style))
    story.append(
        Paragraph(
            f"<b>Research interests:</b> {xml_escape(RESEARCH_INTERESTS)}",
            body_style,
        )
    )

    story.extend(section("Research Experience"))
    for index, entry in enumerate(RESEARCH_EXPERIENCE):
        if index:
            story.append(Spacer(1, 2))
        story.append(
            KeepTogether(
                [
                    role_line(entry["title"], entry["date"]),
                    *[pdf_bullet(item) for item in entry["bullets"]],
                ]
            )
        )

    story.extend(section("Research Outputs & Presentation"))
    for item in RESEARCH_OUTPUTS:
        story.append(pdf_bullet({"text": item}))

    story.extend(section("Selected Engineering Project"))
    for entry in SELECTED_ENGINEERING_PROJECTS:
        story.append(
            KeepTogether(
                [
                    role_line(entry["title"], entry["date"]),
                    *[pdf_bullet(item) for item in entry["bullets"]],
                ]
            )
        )

    story.extend(section("Education"))
    for entry in EDUCATION:
        story.append(role_line(entry["title"], entry["date"]))
        if entry.get("detail"):
            story.append(Paragraph(xml_escape(entry["detail"]), small_style))

    story.extend(section("Professional Experience"))
    for index, entry in enumerate(PROFESSIONAL_EXPERIENCE):
        if index:
            story.append(Spacer(1, 1))
        story.append(role_line(entry["title"], entry["date"]))
        for item in entry["bullets"]:
            story.append(pdf_bullet(item))

    story.extend(section("Technical Skills"))
    for label, detail in TECHNICAL_SKILLS:
        story.append(
            Paragraph(f"<b>{xml_escape(label)}:</b> {xml_escape(detail)}", body_style)
        )

    doc = SimpleDocTemplate(
        str(PDF_OUTPUT),
        pagesize=letter,
        leftMargin=0.5 * inch,
        rightMargin=0.5 * inch,
        topMargin=0.38 * inch,
        bottomMargin=0.35 * inch,
        title=f"{NAME} - Research CV",
        author=NAME,
    )
    doc.build(story, onFirstPage=pdf_metadata, onLaterPages=pdf_metadata)
    add_pdf_language_metadata()


def html_link(url: str, label: str) -> str:
    return (
        f'<a href="{html_escape(url, quote=True)}" target="_blank" '
        f'rel="noreferrer">{html_escape(label)}</a>'
    )


def html_bullets(items: list[dict[str, str]]) -> str:
    rows = []
    for item in items:
        suffix = ""
        if item.get("link"):
            suffix = f" {html_link(item['link'], item['link_label'])}"
        rows.append(f"<li>{html_escape(item['text'])}{suffix}</li>")
    return "<ul>" + "".join(rows) + "</ul>"


def html_role(entry: dict[str, object]) -> str:
    detail = ""
    if entry.get("detail"):
        detail = f'<p class="note">{html_escape(str(entry["detail"]))}</p>'
    bullets = ""
    if entry.get("bullets"):
        bullets = html_bullets(entry["bullets"])
    return (
        "<article>"
        f'<div class="role"><h3>{html_escape(str(entry["title"]))}</h3>'
        f'<time>{html_escape(str(entry["date"]))}</time></div>'
        f"{detail}{bullets}</article>"
    )


def generate_html() -> None:
    research_html = "".join(html_role(entry) for entry in RESEARCH_EXPERIENCE)
    projects_html = "".join(html_role(entry) for entry in SELECTED_ENGINEERING_PROJECTS)
    outputs_html = "<ul>" + "".join(
        f"<li>{html_escape(item)}</li>" for item in RESEARCH_OUTPUTS
    ) + "</ul>"
    education_html = "".join(html_role(entry) for entry in EDUCATION)
    professional_html = "".join(html_role(entry) for entry in PROFESSIONAL_EXPERIENCE)
    skills_html = "".join(
        f"<p><strong>{html_escape(label)}:</strong> {html_escape(detail)}</p>"
        for label, detail in TECHNICAL_SKILLS
    )

    document = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow" />
    <meta name="description" content="Research CV for {html_escape(NAME)}, a Fall 2027 PhD applicant with completed speech-ML research and interests in multimodal, trustworthy, and human-centered AI." />
    <title>{html_escape(NAME)} - Research CV</title>
    <style>
      :root {{ color-scheme: light; --navy: #17324d; --teal: #087f76; --ink: #202b3a; --muted: #526274; --rule: #cad6df; }}
      * {{ box-sizing: border-box; }}
      html {{ scroll-behavior: smooth; }}
      body {{ margin: 0; background: #eef3f5; color: var(--ink); font: 16px/1.6 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }}
      a {{ color: #05665f; text-underline-offset: 0.18em; overflow-wrap: anywhere; }}
      a:hover {{ color: var(--navy); }}
      :focus-visible {{ outline: 3px solid #526d1d; outline-offset: 3px; }}
      .skip {{ position: absolute; left: 1rem; top: -5rem; padding: 0.7rem 1rem; background: #fff; z-index: 2; }}
      .skip:focus {{ top: 1rem; }}
      .page {{ width: min(980px, calc(100% - 2rem)); margin: 2rem auto; padding: clamp(1.5rem, 5vw, 4rem); background: #fff; box-shadow: 0 16px 50px rgba(23, 50, 77, 0.12); }}
      header {{ text-align: center; border-bottom: 2px solid var(--navy); padding-bottom: 1.4rem; }}
      h1 {{ margin: 0; color: var(--navy); font-size: clamp(2rem, 6vw, 3.4rem); line-height: 1.05; letter-spacing: -0.035em; }}
      .focus {{ margin: 0.65rem 0 0; color: var(--teal); font-weight: 750; text-transform: uppercase; letter-spacing: 0.06em; }}
      nav ul, .contact {{ display: flex; flex-wrap: wrap; justify-content: center; gap: 0.65rem 1rem; list-style: none; padding: 0; margin: 1rem 0 0; }}
      .actions a {{ display: inline-flex; min-height: 44px; align-items: center; padding: 0.55rem 0.9rem; border-radius: 0.35rem; border: 1px solid var(--navy); font-weight: 700; text-decoration: none; }}
      .actions a:first-child {{ background: var(--navy); color: #fff; }}
      main {{ margin-top: 1.6rem; }}
      section + section {{ margin-top: 1.7rem; }}
      h2 {{ margin: 0 0 0.85rem; padding-bottom: 0.25rem; border-bottom: 1px solid var(--rule); color: var(--navy); font-size: 1.35rem; letter-spacing: 0.025em; text-transform: uppercase; }}
      h3 {{ margin: 0; color: var(--ink); font-size: 1.05rem; }}
      p {{ margin: 0.35rem 0; }}
      ul {{ margin: 0.45rem 0 0; padding-left: 1.25rem; }}
      article + article {{ margin-top: 1.1rem; }}
      .role {{ display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; }}
      .role time {{ flex: none; color: var(--muted); font-weight: 700; }}
      .note {{ color: var(--muted); }}
      .methods {{ display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.65rem 1rem; }}
      .methods p {{ margin: 0; }}
      footer {{ margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--rule); color: var(--muted); font-size: 0.9rem; }}
      @media (max-width: 640px) {{ .page {{ width: 100%; margin: 0; box-shadow: none; }} .role {{ display: block; }} .role time {{ display: block; }} .methods {{ grid-template-columns: 1fr; }} }}
      @media (prefers-reduced-motion: reduce) {{ html {{ scroll-behavior: auto; }} }}
      @media print {{ body {{ background: #fff; font-size: 10pt; }} .page {{ width: 100%; margin: 0; padding: 0; box-shadow: none; }} .skip, .actions {{ display: none; }} a {{ color: inherit; text-decoration: none; }} }}
    </style>
  </head>
  <body>
    <a class="skip" href="#cv-content">Skip to CV content</a>
    <div class="page">
      <header>
        <h1>{html_escape(NAME)}</h1>
        <p class="focus">{html_escape(FOCUS)}</p>
        <ul class="contact" aria-label="Contact details">
          <li>{html_escape(LOCATION)}</li>
          <li><a href="tel:{PHONE_HREF}">{html_escape(PHONE_DISPLAY)}</a></li>
          <li><a href="mailto:{EMAIL}">{EMAIL}</a></li>
          <li>{html_link(PORTFOLIO, "melodynazar.com")}</li>
          <li>{html_link(LINKEDIN, "linkedin.com/in/naghme-nazar")}</li>
          <li>{html_link(GITHUB, "github.com/nzrnaghme")}</li>
        </ul>
        <nav class="actions" aria-label="CV actions">
          <ul>
            <li><a href="/Naghmeh_Melody_Nazar_Research_CV.pdf" download="Naghmeh_Melody_Nazar_Research_CV.pdf">Download PDF CV</a></li>
            <li><a href="/">Return to research portfolio</a></li>
          </ul>
        </nav>
      </header>

      <main id="cv-content" tabindex="-1">
        <section aria-labelledby="focus-heading">
          <h2 id="focus-heading">Research focus</h2>
          <p>{html_escape(RESEARCH_FOCUS)}</p>
          <p><strong>Research interests:</strong> {html_escape(RESEARCH_INTERESTS)}</p>
        </section>

        <section aria-labelledby="research-heading">
          <h2 id="research-heading">Research experience</h2>
          {research_html}
        </section>

        <section aria-labelledby="outputs-heading">
          <h2 id="outputs-heading">Research outputs &amp; presentation</h2>
          {outputs_html}
        </section>

        <section aria-labelledby="projects-heading">
          <h2 id="projects-heading">Selected engineering project</h2>
          {projects_html}
        </section>

        <section aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          {education_html}
        </section>

        <section aria-labelledby="experience-heading">
          <h2 id="experience-heading">Professional experience</h2>
          {professional_html}
        </section>

        <section aria-labelledby="skills-heading">
          <h2 id="skills-heading">Technical skills</h2>
          <div class="methods">{skills_html}</div>
        </section>
      </main>
      <footer>This accessible HTML CV and the downloadable PDF share one versioned content source. Last updated October 2026.</footer>
    </div>
  </body>
</html>
"""
    HTML_OUTPUT.write_text(document, encoding="utf-8")


if __name__ == "__main__":
    PUBLIC.mkdir(parents=True, exist_ok=True)
    generate_pdf()
    generate_html()
    print(PDF_OUTPUT)
    print(HTML_OUTPUT)
