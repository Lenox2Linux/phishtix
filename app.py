"""Flask entrypoint for the PhishTix phishing analysis web app."""

from __future__ import annotations

from datetime import datetime, timezone

from flask import Flask, jsonify, render_template, request

from backend.analyzer import analyze_message

app = Flask(__name__)
ANALYSIS_HISTORY: list[dict] = []


def _add_to_history(message: str, analysis: dict) -> None:
    """Store an analysis record in memory and retain only the newest entries."""

    ANALYSIS_HISTORY.append(
        {
            "message": message,
            "analysis": analysis,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
    )
    if len(ANALYSIS_HISTORY) > 10:
        del ANALYSIS_HISTORY[:-10]


@app.get("/")
def index() -> str:
    """Render the main PhishTix dashboard page."""

    return render_template("index.html")


@app.post("/analyze")
def analyze() -> tuple:
    """Analyze submitted message text and return phishing risk details."""

    message = request.form.get("message", "").strip()
    analysis = analyze_message(message)
    _add_to_history(message, analysis)
    return jsonify(analysis), 200


@app.get("/history")
def history() -> tuple:
    """Return the latest ten phishing analyses as JSON."""

    return jsonify(ANALYSIS_HISTORY[-10:]), 200


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
