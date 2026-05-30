"""Phishing message analysis logic for the PhishTix application."""

from __future__ import annotations

import re
from typing import Iterable


URGENCY_TERMS = (
    "urgent",
    "immediately",
    "suspended",
    "verify now",
    "act now",
    "expire",
)

CREDENTIAL_TERMS = (
    "password",
    "ssn",
    "social security",
    "credit card",
    "bank account",
)

IMPERSONATION_TERMS = (
    "dear customer",
    "your account",
    "it department",
    "helpdesk",
    "support team",
)

THREAT_TERMS = (
    "permanently closed",
    "legal action",
    "arrested",
    "terminated",
)

SHORTENER_PATTERN = re.compile(
    r"\b(?:bit\.ly|tinyurl\.com|t\.co|goo\.gl|ow\.ly|is\.gd|buff\.ly|cutt\.ly|rb\.gy|shorturl\.at|rebrand\.ly)/\S*",
    flags=re.IGNORECASE,
)


def _find_present_terms(text: str, terms: Iterable[str]) -> list[str]:
    """Return terms that appear in the provided text."""

    return [term for term in terms if term in text]


def _confidence_from_score(risk_score: int) -> str:
    """Map a numeric risk score to a confidence label."""

    if risk_score <= 3:
        return "Low"
    if risk_score <= 6:
        return "Medium"
    return "High"


def _recommendation_from_confidence(confidence: str, indicators: list[str]) -> str:
    """Build an actionable recommendation based on confidence and findings."""

    if not indicators:
        return (
            "No obvious phishing indicators were detected. Still confirm the sender "
            "through a trusted channel before sharing sensitive information."
        )
    if confidence == "High":
        return (
            "Do not click links or open attachments. Report this message to your "
            "security team or mail provider immediately, then delete it."
        )
    if confidence == "Medium":
        return (
            "Do not click links and do not share credentials. Verify the request "
            "using official contact details before taking action."
        )
    return (
        "Proceed carefully. Independently verify the sender and avoid sharing "
        "personal or financial information until legitimacy is confirmed."
    )


def analyze_message(text: str) -> dict:
    """Analyze a message for phishing indicators and assign a risk score.

    The analysis looks for urgency cues, credential requests, suspicious URLs,
    impersonation patterns, and threatening language. The result includes a
    normalized risk score (0-10), detected indicators, confidence level, and
    a user-facing recommendation.
    """

    normalized_text = text.lower()
    indicators: list[str] = []
    risk_score = 0

    urgency_matches = _find_present_terms(normalized_text, URGENCY_TERMS)
    if urgency_matches:
        indicators.append(
            f"Urgency language detected: {', '.join(sorted(urgency_matches))}."
        )
        risk_score += 2

    credential_matches = _find_present_terms(normalized_text, CREDENTIAL_TERMS)
    if credential_matches:
        indicators.append(
            "Credential request terms found: "
            f"{', '.join(sorted(credential_matches))}."
        )
        risk_score += 3

    url_signals: list[str] = []
    if "http://" in normalized_text or "https://" in normalized_text:
        url_signals.append("direct URL present")
    shortened_links = SHORTENER_PATTERN.findall(normalized_text)
    if shortened_links:
        url_signals.append("shortened link detected")

    if url_signals:
        indicators.append(f"Suspicious URL pattern: {', '.join(url_signals)}.")
        risk_score += 3

    impersonation_matches = _find_present_terms(normalized_text, IMPERSONATION_TERMS)
    if impersonation_matches:
        indicators.append(
            "Possible impersonation cues: "
            f"{', '.join(sorted(impersonation_matches))}."
        )
        risk_score += 1

    threat_matches = _find_present_terms(normalized_text, THREAT_TERMS)
    if threat_matches:
        indicators.append(
            f"Threatening language detected: {', '.join(sorted(threat_matches))}."
        )
        risk_score += 2

    risk_score = min(risk_score, 10)
    confidence = _confidence_from_score(risk_score)
    recommendation = _recommendation_from_confidence(confidence, indicators)

    return {
        "risk_score": risk_score,
        "indicators": indicators,
        "confidence": confidence,
        "recommendation": recommendation,
    }
