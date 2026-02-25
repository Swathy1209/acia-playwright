from flask import Flask, request, jsonify
from playwright.sync_api import sync_playwright
import os

app = Flask(__name__)

@app.route("/")
def home():
    return "ACIA Playwright Service Running"

@app.route("/apply", methods=["POST"])
def apply():
    data = request.json
    url = data.get("apply_url")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url)

        # Example generic fields
        try:
            page.fill('input[name="name"]', "Swathi S")
            page.fill('input[name="email"]', "your_email@gmail.com")
            page.set_input_files('input[type="file"]', "resume.pdf")
            page.click('button[type="submit"]')
        except:
            pass

        browser.close()

    return jsonify({"status": "success"})